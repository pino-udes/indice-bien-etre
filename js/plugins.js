/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Please, keep them sorted alphabetically
 */
export default {
    plugins: {
        // indice-bien-etre plugins
        NewIndicesDashboardPlugin: require('@js/plugins/NewIndicesDashboard').default,
        HomeDescriptionPlugin: require('@js/plugins/HomeDescription').default,
        ContentTabs: require('@js/plugins/ContentTabs').default,
        Dashboard: require('@js/plugins/Dashboard').default,
        WidgetsPlugin: require('@js/plugins/Widgets').default,
        IdentifyPlugin: require('@js/plugins/Identify').default,
        MapPlugin: require('@js/plugins/Map').default,

        // product plugins
        AboutPlugin: require('@mapstore/product/plugins/About').default,
        AttributionPlugin: require('@mapstore/product/plugins/Attribution').default,
        FooterPlugin: require('./plugins/Footer'),
        HeaderPlugin: require('@mapstore/product/plugins/Header').default,
        // HomeDescriptionPlugin: require('@mapstore/product/plugins/HomeDescription').default,
        MadeWithLovePlugin: require('@mapstore/product/plugins/MadeWithLove').default,
        MapTypePlugin: require('@mapstore/product/plugins/MapType').default,
        NavMenu: require('@mapstore/product/plugins/NavMenu').default,
        // framework plugins
        AddGroupPlugin: require('@mapstore/plugins/AddGroup').default,
        AnnotationsPlugin: require('@mapstore/plugins/Annotations').default,
        AutoMapUpdatePlugin: require('@mapstore/plugins/AutoMapUpdate').default,
        BackgroundSelectorPlugin: require('@mapstore/plugins/BackgroundSelector').default,
        BurgerMenuPlugin: require('@mapstore/plugins/BurgerMenu').default,
        CRSSelectorPlugin: require('@mapstore/plugins/CRSSelector').default,
        //ContentTabs: require('@mapstore/plugins/ContentTabs').default,
        ContextPlugin: require('@mapstore/plugins/Context').default,
        ContextCreatorPlugin: require('@mapstore/plugins/ContextCreator').default,
        ContextManagerPlugin: require('@mapstore/plugins/contextmanager/ContextManager').default,
        ContextsPlugin: require('@mapstore/plugins/Contexts').default,
        CookiePlugin: require('@mapstore/plugins/Cookie').default,
        // CreateNewMapPlugin: require('@mapstore/plugins/CreateNewMap').default,
        //Dashboard: require('@mapstore/plugins/Dashboard').default,
        DashboardEditor: require('@mapstore/plugins/DashboardEditor').default,
        DashboardsPlugin: require('@mapstore/plugins/Dashboards').default,
        DetailsPlugin: require('@mapstore/plugins/Details').default,
        DrawerMenuPlugin: require('@mapstore/plugins/DrawerMenu').default,
        ExpanderPlugin: require('@mapstore/plugins/Expander').default,
        FeatureEditorPlugin: require('@mapstore/plugins/FeatureEditor').default,
        FeedbackMaskPlugin: require('@mapstore/plugins/FeedbackMask').default,
        FilterLayerPlugin: require('@mapstore/plugins/FilterLayer').default,
        FloatingLegendPlugin: require('@mapstore/plugins/FloatingLegend').default,
        FullScreenPlugin: require('@mapstore/plugins/FullScreen').default,
        //DashboardSaveAsPlugin: require('@mapstore/plugins/DashboardSave').DashboardSaveAs,
        GlobeViewSwitcherPlugin: require('@mapstore/plugins/GlobeViewSwitcher').default,
        GoFull: require('@mapstore/plugins/GoFull').default,
        GridContainerPlugin: require('@mapstore/plugins/GridContainer').default,
        GroupManagerPlugin: require('@mapstore/plugins/manager/GroupManager').default,
        HelpLinkPlugin: require('@mapstore/plugins/HelpLink').default,
        HelpPlugin: require('@mapstore/plugins/Help').default,
        HomePlugin: require('@mapstore/plugins/Home').default,
        //IdentifyPlugin: require('@mapstore/plugins/Identify').default,
        LanguagePlugin: require('@mapstore/plugins/Language').default,
        LayerDownload: require('@mapstore/plugins/LayerDownload').default,
        LayerInfoPlugin: require('@mapstore/plugins/LayerInfo').default,
        //LocatePlugin: require('@mapstore/plugins/Locate').default,
        LoginPlugin: require('@mapstore/plugins/Login').default,
        ManagerMenuPlugin: require('@mapstore/plugins/manager/ManagerMenu').default,
        ManagerPlugin: require('@mapstore/plugins/manager/Manager').default,
        MapEditorPlugin: require('@mapstore/plugins/MapEditor').default,
        MapExportPlugin: require('@mapstore/plugins/MapExport').default,
        MapFooterPlugin: require('@mapstore/plugins/MapFooter').default,
        MapImportPlugin: require('@mapstore/plugins/MapImport').default,
        MapLoadingPlugin: require('@mapstore/plugins/MapLoading').default,
        //MapPlugin: require('@mapstore/plugins/Map').default,
        MapSearchPlugin: require('@mapstore/plugins/MapSearch').default,
        MapsPlugin: require('@mapstore/plugins/Maps').default,
        MapCatalogPlugin: require('@mapstore/plugins/MapCatalog').default,
        MapTemplatesPlugin: require('@mapstore/plugins/MapTemplates').default,
        MeasurePlugin: require('@mapstore/plugins/Measure').default,
        //MediaEditorPlugin: require('@mapstore/plugins/MediaEditor').default,
        MetadataExplorerPlugin: require('@mapstore/plugins/MetadataExplorer').default,
        MousePositionPlugin: require('@mapstore/plugins/MousePosition').default,
        NotificationsPlugin: require('@mapstore/plugins/Notifications').default,
        OmniBarPlugin: require('@mapstore/plugins/OmniBar').default,
        //PlaybackPlugin: require('@mapstore/plugins/Playback.jsx').default,
        PrintPlugin: require('@mapstore/plugins/Print').default,
        QueryPanelPlugin: require('@mapstore/plugins/QueryPanel').default,
        RedirectPlugin: require('@mapstore/plugins/Redirect').default,
        RedoPlugin: require('@mapstore/plugins/History').default,
        RulesDataGridPlugin: require('@mapstore/plugins/RulesDataGrid').default,
        RulesEditorPlugin: require('@mapstore/plugins/RulesEditor').default,
        RulesManagerFooter: require('@mapstore/plugins/RulesManagerFooter').default,
        SavePlugin: require('@mapstore/plugins/Save').default,
        SaveAsPlugin: require('@mapstore/plugins/SaveAs').default,
        ScaleBoxPlugin: require('@mapstore/plugins/ScaleBox').default,
        ScrollTopPlugin: require('@mapstore/plugins/ScrollTop').default,
        //SearchPlugin: require('@mapstore/plugins/Search').default,
        SearchServicesConfigPlugin: require('@mapstore/plugins/SearchServicesConfig').default,
        SearchByBookmarkPlugin: require('@mapstore/plugins/SearchByBookmark').default,
        SettingsPlugin: require('@mapstore/plugins/Settings').default,
        SharePlugin: require('@mapstore/plugins/Share'),
        SnapshotPlugin: require('@mapstore/plugins/Snapshot').default,
        StyleEditorPlugin: require('@mapstore/plugins/StyleEditor').default,
        StreetView: require('@mapstore/plugins/StreetView').default,
        SwipePlugin: require('@mapstore/plugins/Swipe').default,
        TOCItemsSettingsPlugin: require('@mapstore/plugins/TOCItemsSettings').default,
        TOCPlugin: require('@mapstore/plugins/TOC').default,
        ThematicLayerPlugin: require('@mapstore/plugins/ThematicLayer').default,
        ThemeSwitcherPlugin: require('@mapstore/plugins/ThemeSwitcher').default,
        //TimelinePlugin: require('@mapstore/plugins/Timeline').default,
        ToolbarPlugin: require('@mapstore/plugins/Toolbar').default,
        TutorialPlugin: require('@mapstore/plugins/Tutorial').default,
        UndoPlugin: require('@mapstore/plugins/History').default,
        UserManagerPlugin: require('@mapstore/plugins/manager/UserManager').default,
        UserExtensionsPlugin: require('@mapstore/plugins/UserExtensions').default,
        UserSessionPlugin: require('@mapstore/plugins/UserSession').default,
        VersionPlugin: require('@mapstore/plugins/Version').default,
        WidgetsBuilderPlugin: require('@mapstore/plugins/WidgetsBuilder').default,
        //WidgetsPlugin: require('@mapstore/plugins/Widgets').default,
        WidgetsTrayPlugin: require('@mapstore/plugins/WidgetsTray').default,
        ZoomAllPlugin: require('@mapstore/plugins/ZoomAll').default,
        ZoomInPlugin: require('@mapstore/plugins/ZoomIn').default,
        ZoomOutPlugin: require('@mapstore/plugins/ZoomOut').default
    },
    requires: {
        ReactSwipe: require('react-swipeable-views').default,
        SwipeHeader: require('@mapstore/components/data/identify/SwipeHeader').default
    }
};
