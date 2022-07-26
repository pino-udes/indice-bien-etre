import PropTypes from 'prop-types';

/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import { round } from 'lodash';
import { Message } from '@mapstore/components/I18N/I18N';
import Spinner from 'react-spinkit';
import { Glyphicon, ProgressBar, Table, Alert } from 'react-bootstrap';
import Dropzone from 'react-dropzone';

class FileUploader extends React.Component {
    static propTypes = {
        dropMessage: PropTypes.string,
        dropZoneStyle: PropTypes.object,
        dropZoneActiveStyle: PropTypes.object,
        beforeUploadMessage: PropTypes.string,
        // can be a boolean or an object like this : { progress: 0.99 }
        uploading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
        onBeforeUpload: PropTypes.func,
        onUpload: PropTypes.func,
        uploadAdditionalParams: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        // if exists do not run before upload and start directly the upload after drag
        allowUpload: PropTypes.object,
        error: PropTypes.object,
        setFilename: PropTypes.func,
        fileProp: PropTypes.string
    };

    static defaultProps = {
        beforeUploadMessage: <Message msgId="uploader.beforeUpload" />,
        dropMessage: <Message msgId="uploader.dropfile" />,
        dropZoneStyle: {
            borderStyle: "dashed",
            borderWidth: "3px",
            transition: "all 0.3s ease-in-out"
        },
        dropZoneActiveStyle: {
            backgroundColor: "#eee",
            borderWidth: "5px",
            boxShadow: "0px 0px 25px 14px #d9edf7"

        },
        onBeforeUpload: () => {},
        onUpload: () => {},
        setFilename: () => {}
    };

    state = {};

    componentDidUpdate() {
        if (this.props.allowUpload && this.state && this.state.files) {
            this.uploadFiles(this.state.files);
        }
    }

    renderProgress = (uploading) => {
        if (uploading && uploading.progress) {
            let percent = round(uploading.progress * 100, 2);
            return <ProgressBar key="progressbar" striped now={percent} label={`${percent}%`}/>;
        }
        return null;
    };

    renderPreview = () => {
        return (

            <Table striped condensed hover>
                <tbody>
                    {this.state.fileList && this.state.fileList.map((file, index) =>
                        (<tr key={"row_" + index}>
                            <td key="name">{file.name}</td>
                            <td key="size">{this.humanFileSize(file.size)}</td>
                        </tr>) )
                    }
                </tbody>
            </Table>
        );
    };

    renderError = () => {
        if (this.props.error) {
            return <Alert bsStyle="danger">There was an error during the upload: {this.props.error.statusText}<div>{this.props.error.data}</div></Alert>;
        }
        return null;
    };


    render() {
        if (this.state && this.state.files) {
            return <div>{this.props.beforeUploadMessage}{this.renderPreview()}</div>;
        } else if ( this.props && this.props.uploading && !this.state.files ) {
            return (<div>
                <Spinner spinnerName="circle" overrideSpinnerClassName="spinner"/><Message msgId="uploader.uploadingFiles"/>
                {this.renderProgress(this.props.uploading)}
                {this.renderPreview()}
            </div>);
        }

        return (<div><Dropzone
            key="dropzone"
            rejectClassName="alert-danger"
            className="alert alert-info"
            onDrop={this.uploadFiles}
            multiple={false}
            style={this.props.dropZoneStyle}
            activeStyle={this.props.dropZoneActiveStyle}>
            <div style={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left"
            }}>
                <span style={{
                    textAlign: "center"
                }}>
                    <Glyphicon style={{marginRight: "10px"}} glyph="upload" />
                    {this.props.dropMessage}
                </span>


            </div>
        </Dropzone>{this.renderError()}</div>);

    }

    humanFileSize = (size) => {
        var i;
        i = Math.floor( Math.log(size) / Math.log(1024) );
        return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    };

    uploadFiles = (files) => {
        var blob;
        if (!files) return;
        if (!this.props.allowUpload) {
            this.setState({files: files, fileList: files});
            this.props.onBeforeUpload(files);
            blob = files[0].preview;
            // console.log("the what ", files[0]);
            this.props.setFilename(blob);

        } else {
            this.setState({files: null, fileList: files});
            this.props.onUpload(files, this.props.uploadAdditionalParams);
        }
    };
}

export default FileUploader;
