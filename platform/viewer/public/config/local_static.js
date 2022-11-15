const codingValues = {
  id: 'codingValues',

  // Findings
  'SCT:371861004': {
    text: 'Mild intimal coronary irregularities',
    color: 'green',
  },
  'SCT:194983005': {
    text: 'Aortic insufficiency',
    color: 'darkred', // TODO - annotationColor rather than color
  },
  // Series labels
  'SegmentationCardiac:4ch': {
    text: '4-chamber',
    color: '#000000',
    seriesLabel: true, // Remove from examples
  },
  'SegmentationCardiac:3ch': {
    text: '3-chamber',
    color: '#000000',
    seriesLabel: true,
  },
  'SCT:399232001': {
    text: '2-chamber',
    color: '#000000',
    seriesLabel: true,
  },
  'SCT:103340004': {
    text: 'SAX',
    color: '#000000',
    seriesLabel: true,
  },
  'SegmentationCardiac:av': {
    text: 'AV',
    color: '#000000',
    seriesLabel: true,
  },
  'SCT:91134007': {
    text: 'MV',
    color: '#000000',
    seriesLabel: true,
  },
  'SCT:122972007': {
    text: 'PV',
    color: '#000000',
    seriesLabel: true,
  },
  'SegmentationCardiac:ao_cc': {
    text: 'Aorta - candycane',
    color: '#000000',
    seriesLabel: true,
  },
  'SCT:24422004': {
    text: 'Axial',
    color: '#000000',
    seriesLabel: true,
  },
  'SCT:81654009': {
    text: 'Coronal',
    color: '#000000',
    seriesLabel: true,
  },
  'SCT:30730003': {
    text: 'Sagittal',
    color: '#000000',
    seriesLabel: true,
  },
  'SegmentationCardiac:other': {
    text: 'Other',
    color: '#000000',
    seriesLabel: true,
  },
  // fiducial
  'SegmentationCardiac:20000101': {
    text: 'RVI site - AHA',
    color: '#191970',
  },
  'SegmentationCardiac:20000102': {
    text: 'RVI site - other',
    color: '#0000FF',
  },
  'SegmentationCardiac:20000201': {
    text: 'AV mid',
    color: '#4169E1',
  },
  'SegmentationCardiac:20000202': {
    text: 'AV RCC',
    color: '#7B68EE',
  },
  'SegmentationCardiac:20000203': {
    text: 'AV LCC',
    color: '#6495ED',
  },
  'SegmentationCardiac:20000204': {
    text: 'AV NCC',
    color: '#1E90FF',
  },
  'SegmentationCardiac:20000301': {
    text: 'MV mid',
    color: '#00BFFF',
  },
  'SegmentationCardiac:20000401': {
    text: 'PV mid',
    color: '#87CEEB',
  },
  'SegmentationCardiac:20000501': {
    text: 'TV mid',
    color: '#87CEFA',
  },
  'SegmentationCardiac:20000601': {
    text: 'LM ostium',
    color: '#B0E0E6',
  },
  'SegmentationCardiac:20000602': {
    text: 'RCA ostium',
    color: '#F0F8FF',
  },
  'SegmentationCardiac:20000603': {
    text: 'LCx ostium',
    color: '#B0C4DE',
  },
  'SegmentationCardiac:20000701': {
    text: 'Other',
    color: '#8A2BE2',
  },
  // contour
  'SegmentationCardiac:10000101': {
    text: 'LV endo',
    color: 'red',
    joinedOpenContour: true,
  },
};

const cornerstoneContextMenu = {
  id: 'cornerstoneContextMenu',
  uiType: 'ohif.contextMenu',
  refs: codingValues,
  menus: [
    {
      id: 'forExistingMeasurement',
      selector: ({ nearbyToolData }) => !!nearbyToolData,
      items: [
        {
          uiType: 'ohif.contextSubMenu',
          label: 'Site',
          actionType: 'SubMenu',
          subMenu: 'siteSelectionSubMenu',
        },
        {
          uiType: 'ohif.contextSubMenu',
          label: 'Finding',
          actionType: 'SubMenu',
          subMenu: 'findingSelectionSubMenu',
        },
        {
          // uiType is implicit here in the configuration setup
          label: 'Delete Measurement',
          actionType: 'RunCommands',
          commands: [
            {
              commandName: 'deleteMeasurement',
            },
          ],
        },
        {
          label: 'Add Label',
          actionType: 'RunCommands',
          commands: [
            {
              commandName: 'setLabel',
            },
          ],
        },
      ],
    },

    {
      id: 'findingSelectionSubMenu',
      selector: ({ nearbyToolData }) => !!nearbyToolData,
      attribute: 'code', // This will no longer be required/used
      items: [
        {
          customizationType: 'contextMenu.findingMenuItem',
          commandName: 'setFinding', // Remove commandName, once customizationType implemented
          code: 'SCT:371861004',
        },
        {
          customizationType: 'contextMenu.findingMenuItem',
          commandName: 'setFinding', // Remove commandName, once uiType implemented
          code: 'SCT:194983005',
        },
      ],
    },

    {
      id: 'siteSelectionSubMenu',
      selector: ({ nearbyToolData }) => !!nearbyToolData,
      attribute: 'code',
      items: [
        {
          uiType: 'ohif.siteMenuItem',
          // Remove actionType and commandName
          actionType: 'Default',
          commandName: 'setSite',
          code: 'SegmentationCardiac:4ch',
        },
        {
          uiType: 'ohif.siteMenuItem',
          commandName: 'setSite',
          code: 'SegmentationCardiac:3ch',
        },
      ],
    },
  ],
};

window.config = {
  routerBasename: '/',
  customizationService: [
    '@ohif/extension-default.customizationModule.helloPage',
  ],

  extensions: [],
  modes: [],
  showStudyList: true,
  maxNumberOfWebWorkers: 3,
  // below flag is for performance reasons, but it might not work for all servers
  omitQuotationForMultipartRequest: true,
  showLoadingIndicator: true,
  // filterQueryParam: false,
  dataSources: [
    {
      friendlyName: 'Static WADO Local Data',
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb',
      configuration: {
        name: 'DCM4CHEE',
        wadoUriRoot: '/dicomweb',
        qidoRoot: '/dicomweb',
        wadoRoot: '/dicomweb',
        qidoSupportsIncludeField: false,
        supportsReject: false,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        supportsWildcard: true,
        staticWado: true,
        singlepart: 'bulkdata,video,pdf',
      },
    },
    {
      friendlyName: 'dicom json',
      namespace: '@ohif/extension-default.dataSourcesModule.dicomjson',
      sourceName: 'dicomjson',
      configuration: {
        name: 'json',
      },
    },
    {
      friendlyName: 'dicom local',
      namespace: '@ohif/extension-default.dataSourcesModule.dicomlocal',
      sourceName: 'dicomlocal',
      configuration: {},
    },
  ],
  httpErrorHandler: error => {
    // This is 429 when rejected from the public idc sandbox too often.
    console.warn(error.status);

    // Could use services manager here to bring up a dialog/modal if needed.
    console.warn('test, navigate to https://ohif.org/');
  },
  defaultDataSourceName: 'dicomweb',
  hotkeys: [
    {
      commandName: 'incrementActiveViewport',
      label: 'Next Viewport',
      keys: ['right'],
    },
    {
      commandName: 'decrementActiveViewport',
      label: 'Previous Viewport',
      keys: ['left'],
    },
    { commandName: 'rotateViewportCW', label: 'Rotate Right', keys: ['r'] },
    { commandName: 'rotateViewportCCW', label: 'Rotate Left', keys: ['l'] },
    { commandName: 'invertViewport', label: 'Invert', keys: ['i'] },
    {
      commandName: 'flipViewportHorizontal',
      label: 'Flip Horizontally',
      keys: ['h'],
    },
    {
      commandName: 'flipViewportVertical',
      label: 'Flip Vertically',
      keys: ['v'],
    },
    { commandName: 'scaleUpViewport', label: 'Zoom In', keys: ['+'] },
    { commandName: 'scaleDownViewport', label: 'Zoom Out', keys: ['-'] },
    { commandName: 'fitViewportToWindow', label: 'Zoom to Fit', keys: ['='] },
    { commandName: 'resetViewport', label: 'Reset', keys: ['space'] },
    { commandName: 'nextImage', label: 'Next Image', keys: ['down'] },
    { commandName: 'previousImage', label: 'Previous Image', keys: ['up'] },
    // {
    //   commandName: 'previousViewportDisplaySet',
    //   label: 'Previous Series',
    //   keys: ['pagedown'],
    // },
    // {
    //   commandName: 'nextViewportDisplaySet',
    //   label: 'Next Series',
    //   keys: ['pageup'],
    // },
    { commandName: 'setZoomTool', label: 'Zoom', keys: ['z'] },
    // ~ Window level presets
    {
      commandName: 'windowLevelPreset1',
      label: 'W/L Preset 1',
      keys: ['1'],
    },
    {
      commandName: 'windowLevelPreset2',
      label: 'W/L Preset 2',
      keys: ['2'],
    },
    {
      commandName: 'windowLevelPreset3',
      label: 'W/L Preset 3',
      keys: ['3'],
    },
    {
      commandName: 'windowLevelPreset4',
      label: 'W/L Preset 4',
      keys: ['4'],
    },
    {
      commandName: 'windowLevelPreset5',
      label: 'W/L Preset 5',
      keys: ['5'],
    },
    {
      commandName: 'windowLevelPreset6',
      label: 'W/L Preset 6',
      keys: ['6'],
    },
    {
      commandName: 'windowLevelPreset7',
      label: 'W/L Preset 7',
      keys: ['7'],
    },
    {
      commandName: 'windowLevelPreset8',
      label: 'W/L Preset 8',
      keys: ['8'],
    },
    {
      commandName: 'windowLevelPreset9',
      label: 'W/L Preset 9',
      keys: ['9'],
    },
  ],
};
