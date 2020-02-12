import { StyleSheet, Platform, Dimensions, PixelRatio, ColorPropType} from 'react-native';

var {height, width} = Dimensions.get('window');

// Constants
const fzbase = width / 34;

// Multipliers
const offset = 0.2 * (PixelRatio.get()<2.5? PixelRatio.get(): PixelRatio.get()*.55); //NUNCA TOCAR -NEVER TOUCH
const mult_0082  = 0.55 + offset;
const mult_01  = 0.70 + offset;
const mult_02  = 0.80 + offset;
const mult_022 = 0.85 + offset;
const mult_03  = 0.90 + offset;
const mult_032 = 0.95 + offset;
const mult_04  = 1.00 + offset;
const mult_05  = 1.10 + offset;
const mult_06  = 1.20 + offset;
const mult_07  = 1.30 + offset;
const mult_08  = 1.40 + offset;
const mult_09  = 1.50 + offset;
const mult_10  = 1.60 + offset;
const mult_11  = 1.70 + offset;
const mult_12  = 1.80 + offset;
const mult_13  = 1.90 + offset;
const mult_14  = 2.00 + offset;
const mult_15  = 2.10 + offset;
const mult_16  = 2.20 + offset;


export const colors = {
	White: '#FFFFFF',
  	VTLightBlue: '#00A0E6',
  	VTDarkBlue: '#0072A3',
  	VTTurquoise: '#00CCCB',
  	VTBgGray: '#F0F3F5',
  	VTLightGray: '#A1ACB3',
  	VTGray: '#E0E2E4',
	VTDarkGray: '#343D42',
	VTAlertRed: '#F42464',
	Black: '#000000',
	Facebook: '#3b5998',
	Gmail: '#c4302b',

	// Profiles

	TravelerColor: '#3FC5D6',
	AdministratorColor: '#00CCCB',
	ApproverColor: '#003D7B',

	// Alerts

	success: '#16E3B4',
	warning: '#FFD340',
	error: '#F06A6A',

	/////// New Pallettes
	BackgroundColorDefault: '#66E49B', /////base
	Base: '#66E49B',
	AccentPurple: '#7C0E93',
	AccentRed: '#93110E',

	
};

const fonts = {
	light: 'RobotoMono-Light',
	light_italic: 'RobotoMono-LightItalic',
  	regular: 'RobotoMono-Regular',
  	italic: 'RobotoMono-Italic',
  	semibold: 'RobotoMono-SemiBold',
  	semibold_italic: 'RobotoMono-SemiBoldItalic',
  	bold: 'RobotoMono-Bold',
  	bold_italic: 'RobotoMono-BoldItalic',
};

// Layout Styles
export const layout = StyleSheet.create({
	// Main container Views
	MainContainer :{
        flex:1,
        // paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        paddingHorizontal: width / 12,
        alignItems: 'center',
        position: 'relative',
		//backgroundColor: colors.VTBgGray,
		backgroundColor: colors.BackgroundColorDefault,
    },
    centerCenter: {
    	width: '100%',
    	alignItems: 'center',
    	justifyContent: 'center',
    	flexDirection: 'column',
    },
    AlignCenter: {
    	justifyContent: 'center',
    },
    // --
    // Main container ScrollViews
	MainContainerSV :{
		flex: 1,
		width: '100%',
		marginVertical: 20,
	},
	MainContainerSV2 :{
		flex: 1,
		width: '100%',
	},
	MainContainerSVFlatlist :{
		flex: 1,
		width: '100%',
		marginVertical: 20,
		flexDirection: 'row',
	},
	NotificationMainContainerSV :{
		flex: 1,
		width: '100%',
		marginVertical: 2,
    },
    // --
    // Main tabs container styles
    MainTabsCont: {
    	backgroundColor: 'transparent',
    	borderColor: '#E1E4E6',
    	borderBottomWidth: 1,
    	width: '100%',
    	height: 35,
    	marginBottom: 15,
    	flexDirection: 'row',
    	overflow: 'hidden',
    	marginVertical: 20,
    },
        MainTabsContOther: {
    	backgroundColor: 'transparent',
    	width: '100%',
    	height: 35,
    	marginBottom: 15,
    	flexDirection: 'row',
    	overflow: 'hidden',
    	marginVertical: 1,
    },
    //--
    // General text container
	GralTextCont: {
		width: '100%',
		height: 'auto',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	},
    // --
    // General text container
	BillDetailTextCont: {
		width: '100%',
		height: 'auto',
		alignItems: 'flex-start',
		justifyContent: 'center',
		flexDirection: 'column',
	},
    // --
    // Travel text container
	TravelTextCont: {
		width: '100%',
		height: 'auto',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		marginTop: fzbase,
	},
    // --
    // Travel text container
	TravelBudgetInfoCont: {
		width: '90%',
		height: 'auto',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		marginTop: fzbase,
		backgroundColor: colors.VTTurquoise,
		flexDirection: 'row',
		padding: fzbase,
		borderRadius: fzbase,
		marginBottom: fzbase * 2,
	},
    // --
    // Photo frame styles
    capture: {
        flex: 0,
        backgroundColor: 'transparent',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        position: 'relative',
        justifyContent: 'center',
    },
    CameraView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    PhotoPreview: {
    	width: '100%',
    	height: height,
    	position: 'absolute',
    },
    // Camera button container
    cameraButtonsCont: {
		backgroundColor: 'transparent',
		width: '100%',
		height: 120,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		zIndex: 10,
		position: 'absolute',
		bottom: 0,
	},
	// Input group styles
	InputGroup: {
		width: '100%',
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
	},
	SwitchCont: {
		width: '100%',
		marginBottom: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 'auto',
		flexDirection: 'row',
		marginVertical: fzbase,
	},
	SwitchLabel: {
		flex: 1,
		alignItems: 'center',
		paddingRight: fzbase,
		height: 'auto',
	},
	PickerGroup: {
		marginBottom: 10,
		position: 'relative',
	},
	// Dinamic travelers list
	DinamicTravelersList: {
		width: '100%',
		marginBottom: fzbase * 2,
	},
	DinamicTravelersListItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: fzbase,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(0,0,0,0.1)',
	},
	textAlertCont:{
		width: '100%',
		paddingHorizontal: 15,
	},
	textAlertError:{
		fontSize: fzbase * mult_02,
		color: 'red'
	},
	textOrangeError:{
		fontSize: fzbase * mult_02,
		color: '#FFA222'
	},
	textYellowError:{
		fontSize: fzbase * mult_02,
		color: '#FFD753'
	},
	textGreenError:{
		fontSize: fzbase * mult_02,
		color: '#00CCCB'
	},
	TowCol: {
		width: '47%',
	},
	// --
	// Dinamic traveler card
	DinamicTravelerCard: {
		width: '100%',
		marginBottom: fzbase,
	},
	DinamicTravelerCardHeader: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: fzbase * 1.3,
	},
	DinamicTravelerCardBody: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: fzbase,
		paddingLeft: fzbase,
		paddingRight: fzbase,
		borderBottomWidth: 1,
		borderColor: 'rgba(0,0,0, 0.2 )',
	},
	DTCTavelerInfo: {
		flex: 1,
	},
	// --
	// Registration tabs style
	RegTabsCont: {
		backgroundColor: 'transparent',
		width: '100%',
		flexDirection: 'column',
		position: 'relative',
	},
	ProgressBarCont: {
		backgroundColor: '#E1E4E6',
		height: 5,
		width: '100%',
		flexDirection: 'row',
	},
	ProgressBarIndInner: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.VTLightBlue,
	},
	ProgressBarIndMiddle: {
		width: '50%',
	},
	ProgressBarIndOneThird: {
		width: '33.3%',
	},
	ProgressBarIndTowThird: {
		width: '66.6%',
	},
	ProgressBarIndFull: {
		width: '100%',
	},
	ProgressBarIndText: {
		fontSize: fzbase * mult_022,
	},
	ProgressBarBtnCont: {
		width: '100%',
		flexDirection: 'row',
		marginVertical: 0,
	},
	//--
	// walkthrough tabs style
	WalkthroughTabsCont: {
		backgroundColor: 'transparent',
		width: '100%',
		flexDirection: 'column',
		position: 'relative',
	},
	// --
	// Reject alert message
	RejectAlerCont: {
		width: '100%',
		paddingVertical: fzbase * 1.5,
		paddingHorizontal: fzbase * 1.5,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.error,
		marginBottom: fzbase * 1.3,
	},
	// --
	// Photo preview styles
	PhotoPreviewCont: {
		borderRadius: 15,
		width: '100%',
		height: height / 3,	
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		marginBottom: 20,
		position: 'relative',
	},
	PhotoPreviewContSml: {
		borderRadius: 15,
		width: '100%',
		height: height / 4,	
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		marginBottom: 20,
		marginTop: 20,
		position: 'relative',
	},
	PhotoPreviewImg: {
		width: '100%',
		height: '100%',
		resizeMode:'contain',
	},
	// --
	// Alert modal styles
	ModalIconCont:{
		width: 150,
		height: 150,
		marginBottom: height / 9,
	},
	ModalIconAlertCont:{
		width: 100,
		height: 100,
		marginBottom: 20,
	},
	ModalCont: {
		flex: 1,
		paddingHorizontal: width / 12,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
	},
	ModalTextCont: {
		width: '90%',
		backgroundColor: 'transparent',
		marginBottom: height / 9,
		textAlign: 'center',
		alignItems: 'center',
        justifyContent: 'center',
	},
	ModalTrialInfoCont: {
		backgroundColor: colors.White,
		borderRadius: 10,
		width: '100%',
		padding: width / 12,
		marginBottom: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	// --
	// Actual travel card styles
	TravelCardCont: {
		width: '100%',
		paddingVertical: fzbase,
		paddingHorizontal: fzbase * 1.5,
		//borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},
	ApproveCard: {
		backgroundColor: colors.VTTurquoise,
	},	
	ApproveCardBlue: {
		backgroundColor: colors.VTLightBlue,
	},	
	ApprovetravelCard: {
			backgroundColor: colors.success,
	},
	ExcedCard: {
		backgroundColor: '#F06A6A',
	}, 
	TravelCardInfoCont: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: fzbase,
	},
	ButtonsSpends: {
		width: '100%',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		
	},
	ButtonsSpends2: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		
	},
	ButtonsSpends3: {
		alignItems:'center',
		flexDirection: 'column',
		
	},
	TravelCardInfoColumn: {
		width: '50%',
		flexDirection: 'column',
		padding: 3,
	},
	TravelCardInfoTitle: {
		fontSize: fzbase * mult_01,
		marginBottom: fzbase * 0.2,
	},
	TravelCardInfoValue: {
		fontSize: fzbase * mult_02,
	},
	CurrencyIndDetail: {
		width: fzbase * 2.5,
		height: 15,
		marginBottom: 5,
		borderRadius: 10,
		marginLeft: 5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	CurrencyIndBill: {
		width: fzbase * 3.0,
		height: 15,
		marginBottom: 5,
		borderRadius: 10,
		marginLeft: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: colors.VTTurquoise,
		borderWidth: 1,
	},
	StateManaged: {
		width: fzbase * 2.5,
		height: 14,
		marginBottom: 5,
		marginLeft: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: colors.VTTurquoise,
		
	},
	CurrencyIndText: {
		fontSize: fzbase * mult_0082,
	},
	TravelCardMessageCont: {
		width: '100%',
		marginVertical: fzbase,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	//--

	// Reject Reasosn card
	RejectReasonCard: {
		backgroundColor: colors.White,
		width: '100%',
		paddingVertical: fzbase,
		paddingHorizontal: fzbase * 1.5,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'flex-start',
		marginBottom: fzbase * 1.3,
	},
	RejectReasonText: {
		fontSize: fzbase * mult_07,
		color: '#7E7E7E',
		marginBottom: fzbase * 2.5,
	},
	ApproverText: {
		fontSize: fzbase * mult_05,
		color: '#7E7E7E',
		marginBottom: fzbase * 0.7,
	},
	//--

	// Notifications card
	NotificatiosnCard: {
		backgroundColor: colors.White,
		width: '100%',
		paddingVertical: fzbase,
		paddingHorizontal: fzbase * 1.5,
		borderRadius: 3,
		justifyContent: 'center',
		alignItems: 'flex-start',
		marginBottom: fzbase * 1.3,
	},
	NotificatiosnCardBody: {
		marginBottom: fzbase,
	},
	NotificatiosnCardBodyText: {
		fontSize: fzbase * mult_05,
		marginBottom: fzbase,
	},
	NotificatiosnCardFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	NotificatiosnCardFooterDate: {
		paddingVertical: fzbase * 0.6,
	},
	NotificatiosnDateText: {
		fontSize: fzbase * mult_03,
	},
	NotificatiosnCardFooterInteractions: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		flexDirection: 'row',
	},
	NotificatiosnInteractionsText: {
		fontSize: fzbase * mult_02,
	},
	//--

	// Bill List styles
	BillItemCont: {
		backgroundColor: colors.White,
		borderRadius: 10,
		padding: 15,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginBottom: 15,
	},
	BillItemIcont: {
		width: 45,
		height: 45,
	},
	BillItemTextCont: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingLeft: 15,
	},
	BillItemText: {
		fontSize: fzbase * mult_022,
	},
	BillItemText2: {
		fontSize: fzbase * mult_022,
		justifyContent:'center'
	},
	//--
	// Admin list items
	AdminItemCont: {
		backgroundColor: colors.White,
		borderRadius: fzbase * 0.8,
		paddingHorizontal: fzbase,
		// minWidth: '40%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: fzbase,
		minWidth:'30%',
		overflow: 'hidden',
		width:180,
		marginLeft:6
	},
	AdminItemIconCont:{
		width: fzbase * 3.5,
		height: fzbase * 3.5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	userIcon:{
		width: fzbase * 3.5,
		height: fzbase * 3.5,
		borderRadius: fzbase * 1.75,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.VTLightBlue,
	},
	userIconRed:{
		width: fzbase * 3.5,
		height: fzbase * 3.5,
		borderRadius: fzbase * 1.75,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.VTAlertRed,
	},
	IconImage:{
		width: fzbase * 3.5,
		height: fzbase * 3.5,
	},
	AdminItemTextCont: {
		flex: 1,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'flex-start',
		padding: fzbase,
		height: fzbase * 7,
		maxWidth:'70%',
		overflow: 'hidden',
	},
	AdminItemActionsCont: { 
		height: '100%',
		width: fzbase * 6,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	AdminItemAction: {
		width: fzbase * 2.2,
		height: fzbase * 2.2,
		marginHorizontal: fzbase * 0.3,
		position: 'relative', 
	},
	AdminCounterAction: {
		width: fzbase * 3,
		height: fzbase * 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	AdminFloatACounter: {
		width: fzbase * 2,
		height: fzbase * 2,
		backgroundColor: colors.VTTurquoise,
		borderRadius: fzbase,
		position: 'absolute',
		top: 15,
		right: 8,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 100,
	},
	AdminFloatACounterReject: {
		width: fzbase * 2,
		height: fzbase * 2,
		backgroundColor: colors.VTAlertRed,
		borderRadius: fzbase,
		position: 'absolute',
		top: 15,
		right: 8,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 100,
	},
	AdminFloatACounterPend: {
		width: fzbase * 2,
		height: fzbase * 2,
		backgroundColor: colors.VTLightGray,
		borderRadius: fzbase,
		position: 'absolute',
		top: 15,
		right: 8,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 100,
	},

	AdminItemStatusCont:{
		width: fzbase * 3,
		height: fzbase * 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	AdminItemTextNormal: {
		fontSize: fzbase * mult_05,
		marginVertical: fzbase * 0.3 ,
	},
	AdminItemTextMedium: {
		fontSize: fzbase * mult_04,
		marginVertical: fzbase * 0.3 ,
	},
	AdminItemTextSmall: {
		fontSize: fzbase * mult_02,
		marginVertical: fzbase * 0.3 ,
	},
	//--
	// Admin list items
	SubscriptiosnContainer:{
		flex: 1,
	},
	ActiveSubscriptionCard:{
		width: '100%',
		paddingHorizontal: fzbase * 1.5,
		paddingVertical: fzbase * 2,
	},
	PendingCard:{
		backgroundColor: colors.error,
	},
	SuspendendCard:{
		backgroundColor: colors.VTLightGray,
	},
	SelectedCard:{
		backgroundColor: colors.White,
		paddingHorizontal: fzbase * 2,
		paddingVertical: fzbase * 2,
	},
	ActiveSubscriptionCardHeader: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: fzbase,
	},
	SubscriptionStateIndicator:{
		borderWidth: 1, 
		borderColor: 'white',
		padding: 0,
		borderRadius: fzbase * 1.5,
		height: fzbase * 3,
		lineHeight: 0,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: fzbase * 2,
		flexDirection: 'row',
	},
	SubscriptionStateIndicatorIcon:{
		marginRight: fzbase,
	},
	SubscriptionStateIndicatorLabel:{
		fontSize: fzbase * mult_04,
	},
	ActiveSubscriptionCardBody: {
	},
	SubscriptionTitle: {
		fontSize: fzbase * mult_16,
		marginVertical: fzbase,
	},
	SubscriptionList: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		marginVertical: fzbase * 0.3,
	},
	SubscriptionListIcon: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginRight: fzbase,
	},
	SubscriptionListLabel: {
		fontSize: fzbase * mult_05,
	},
	SubscriptionListLabel2: {
		fontSize: fzbase * mult_07,
	},
	SubscriptionDescription: {
		marginVertical: fzbase,
		fontSize: fzbase * mult_09,
		lineHeight: fzbase * 2,
	},
	SubscriptionDatesCont: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: fzbase * 2,
	},
	SubscriptionDate: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: 150,
	},
	OtherPlansTitle: {
		padding: fzbase * 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	PlansTitle: {
		fontSize: fzbase * mult_14,
	},
	OtherPlansCard: {
		backgroundColor: 'white',
		borderRadius: fzbase,
		padding: fzbase * 1.5,
		marginHorizontal: fzbase * 2,
		marginBottom: fzbase * 1.3,
	},
	SubscriptionFormCont: {
		backgroundColor: colors.VTLightBlue,
		padding: fzbase * 2,
	},
	//--
	// Travel List styles
	TravelItemCont: {
		borderRadius: 10,
		padding: 15,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginBottom: 15,
	},
	CurrentTravel: {
		backgroundColor: colors.VTLightBlue,
	},
	ActiveTravel: {
		backgroundColor: colors.VTGray,
	},
	TravelItemIcont: {
		width: 50,
		height: 50,
	},
	ReopenItemIcont: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 30,
		height: 'auto',
		backgroundColor: 'transparent',
	},
	DateText: {
		marginTop: 8,
		fontSize: fzbase * mult_03,
	},
	//--
	// Profile Styles
	ProfileIcon: {
		width: 80,
		height: 80,
		marginVertical: height / 18,
		backgroundColor: colors.VTLightBlue,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 40,
	},
	//--
	// Alert image Style
	AlertImageCont: {
		width: fzbase * 12,
		height: fzbase * 12,
		marginVertical: fzbase,
	},
	AlertImage: {
		width: fzbase * 12,
		height: fzbase * 12,
	},
	//--
});

// Spacers Styles
export const spacers = StyleSheet.create({
	mt1: {
		marginTop: fzbase,
	},
	mt2: {
		marginTop: fzbase * 2,
	},
	mt3: {
		marginTop: fzbase * 3,
	},
	mt4: {
		marginTop: fzbase * 4,
	},
	mb1: {
		marginBottom: fzbase,
	},
	mb2: {
		marginBottom: fzbase * 2,
	},
	mb3: {
		marginBottom: fzbase * 3,
	},
	mb4: {
		marginBottom: fzbase * 4,
	},
	pd0: {
		paddingHorizontal: 0,
		paddingVertical: 0
	},
	pdt1: {
		paddingTop: fzbase,
	},
	pdt2: {
		paddingTop: fzbase * 2,
	},
	pdt3: {
		paddingTop: fzbase * 3,
	},
	pdb1: {
		paddingBottom: fzbase,
	},
	pdb2: {
		paddingBottom: fzbase * 2,
	},
	pdb3: {
		paddingBottom: fzbase * 3,
	},
});

// Stack styles
export const stack = StyleSheet.create({
	// Stack navigator styles
    MainStackNavigatorCont: {
    	backgroundColor: 'transparent',
    	width: (Platform.OS) === 'android' ? '80%' : '100%',
    	justifyContent: 'center',
    	alignItems: 'center',
    	flexDirection: 'row',
    	height: 40,
    },
    MainStackNavigatorLogoCont: {
    	backgroundColor: 'transparent',
    	width: (Platform.OS) === 'android' ? '80%' : '100%',
    	marginLeft: (Platform.OS) === 'android' ? '19%' : 0,
    	justifyContent: 'center',
    	alignItems: 'center',
    	flexDirection: 'row',
    	height: 40,
    },
    MainStackNavigatorFullCont: {
    	backgroundColor: 'transparent',
    	width: '100%',
    	flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center',
    	flexDirection: 'row',
    	height: 40,
    },
    StackNavigatorTitle: {
    	fontSize: fzbase * mult_04,
    	flex: 1,
    	textAlign: 'center',
    },
    StackNavigatorIconCont: {
    	width: 40,
    	height: 40,
    	justifyContent: 'center',
    	alignItems: 'center',
    	position: 'relative',
    },
    StackNavigatorLogoCont: {
    	backgroundColor: 'transparent',
    	flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center',
    	height: 40,
    },
    StackNavigatorAlertsButton: {
    	backgroundColor: 'transparent',
    	width: fzbase * 2.5,
    	height: fzbase * 2.5,
    	borderRadius: fzbase * 1.4,
    	justifyContent: 'center',
    	alignItems: 'center',
    },
    StackNavigatorAlertsInd: {
    	position: 'absolute',
    	backgroundColor: '#F42464',
    	width: fzbase * 1.2,
    	height: fzbase * 1.2,
    	borderRadius: fzbase * 0.5,
    	right: 2,
    	top: 4,
    	zIndex: 200,
    	justifyContent: 'center',
    	alignItems: 'center',
    },
    StackNavigatorAlertsIndText: {
		fontSize: (Platform.OS) === 'android' ? 7 : 8,
    },
    //--
});

// drawer styles
export const drawer = StyleSheet.create({
	// Main Drawer styles
    DrawerCont: {
    	flex:1,
    	backgroundColor: 'transparent',
    	paddingVertical: height / 20,
    },
    DrawerBottomCont: {
    	backgroundColor: 'transparent',
    	width: '100%',
    	marginVertical: 20,
    	alignItems: 'center',
    	justifyContent: 'center',
    	flexDirection: 'row',
    },
    DrawerLink: {
    	fontSize: (Platform.OS) === 'android' ? fzbase * 0.9 : fzbase * 1.1,
    },
    DrawerTopCont: {
    	backgroundColor: 'transparent',
    	width: '100%',
    	marginVertical: 20,
    	paddingHorizontal: width / 12,
    	alignItems: 'center',
    	justifyContent: 'space-between',
    	flexDirection: 'row',
    },
    DrawerTopButtonCont: {
    	flexDirection: 'row',
    	justifyContent: 'center',
    	alignItems: 'center',
    },
    DraweProfileButton: {
    	backgroundColor: colors.VTLightBlue,
    	width: fzbase * 4,
    	height: fzbase * 4,
    	borderRadius: fzbase * 2, 
    },
    SwitchProfileButton: {
    	backgroundColor: colors.VTBgGray,
    	width: fzbase * 3,
    	height: fzbase * 3,
    	borderRadius: fzbase * 1.5, 
    },
    BottonButton: {
    	backgroundColor: colors.VTBgGray,
    	width: fzbase * 3,
    	height: fzbase * 3,
    	borderRadius: fzbase * 1.5,
    	marginHorizontal: fzbase, 
    },
    DrawerItemsCont: {
    	flex: 1,
    	paddingHorizontal: width / 12,
    	justifyContent: 'center',
    	backgroundColor: 'transparent',
    	borderColor: colors.VTBgGray,
    	borderBottomWidth: 1,
    	borderTopWidth: 1,
    },
    DrawerItemIconCont: {
    	width:  fzbase * 3,
    	height:  fzbase * 3,
    	backgroundColor: 'transparent',
    	justifyContent: 'center',
    	alignItems: 'center',
    	marginVertical: 10,
    },
    DrawerItemIcon: {
    	width: 25,
    	height: 25,
    },
    DrawerItemItemCont: {
    	backgroundColor: 'transparent',
    	alignItems: 'flex-start',
    },
    DrawerItemItemText: {
    	fontSize: (Platform.OS) === 'android' ? fzbase * 1.1 : fzbase * 1.3,
    	color: colors.VTLightBlue,
    	paddingLeft: 10,
    },
    //--
});

// Text styles
export const text = StyleSheet.create({
	GralText: {
		fontSize: fzbase * mult_04,
		paddingBottom: 10,
		textAlign: 'center',
		width: '85%',
	},
	AlertText: {
		fontSize: fzbase * mult_06,
		paddingBottom: 10,
		textAlign: 'center',
		width: '100%',
	},
	SumaryText: {
		fontSize: fzbase * mult_05,
		paddingBottom: 10,
		textAlign: 'left',
	},
	// Travel info Text style
	TravelInfoTitle: {
		fontSize: fzbase * mult_11,
		textAlign: 'center',
		width: '100%',
	},
	TravelInfoSubtitle: {
		fontSize: fzbase * mult_04,
		textAlign: 'center',
		width: '100%',
		marginVertical: fzbase * 0.2,
	},
	TravelInfoText: {
		marginTop: fzbase * 0.8,
		fontSize: fzbase * mult_04,
		textAlign: 'center',
		width: '85%',
	},
	TravelInfoBudgetInfo: {
		fontSize: fzbase * mult_02,
		textAlign: 'left',
		marginRight: 5,
	},
	// --
	// Text style variables
	Thin: {
		fontFamily: fonts.light,
	},
	ThinI: {
		fontFamily: fonts.light_italic,
	},
	Regular: {
		fontFamily: fonts.regular,
	},
	RegularI: {
		fontFamily: fonts.regular_italic,
	},
	Medium: {
		fontFamily: fonts.semibold,
	},
	MediumI: {
		fontFamily: fonts.bold_italic,
	},
	Strong: {
		fontFamily: fonts.semibold,
	},
	StrongI: {
		fontFamily: fonts.bold_italic,
	},
	// Links
    GralLink: {
    	backgroundColor: 'transparent',
	    padding: 5,
	    color: '#FFFFFF',
	    width: '100%',
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginBottom: 10,
	},
	LText: {
		fontFamily: fonts.regular,
		fontSize: fzbase * mult_032,
	},
	// Buttons
	BText:{
		fontFamily: fonts.bold,
		fontSize: fzbase * mult_03,
		backgroundColor: 'transparent',
		textAlign: 'center',
	},
	BTextLG:{
		fontFamily: fonts.semibold,
		fontSize: fzbase * mult_05,
		backgroundColor: 'transparent',
		textAlign: 'center',
	},
	SuccessText: {
		color: colors.success,
	},
	WarningText: {
		color: colors.warning,
	},
	ErrorText: {
		color: colors.error,
	},
	// Text color variables
	TLight: {
		color: colors.White,
	},
	TGmailColor: {
		color: colors.Gmail,
	},
	TFacebookColor: {
		color: colors.Facebook,
	},
	TLightBlue: {
		color: colors.VTLightBlue,
	},
	TDarkBlue: {
		color: colors.VTDarkBlue,
	},
	TBlack: {
		color: colors.Black,
	},
	TTurquoise: {
		color: colors.VTTurquoise,
	},
	TLightGray: {
		color: colors.VTLightGray,
	},
	TDarkGray: {
		color: colors.VTDarkGray,
	},
	TRed: {
		color: colors.VTAlertRed,
	},
	//--
	// Input label styles
	InputLabel: {
		fontSize: fzbase * mult_03,
		paddingBottom: 10,
		width: '90%',
		fontFamily: fonts.semibold,
		color: colors.VTDarkGray,
	},
	//--
});

// Login styles
export const login = StyleSheet.create({
	// Login logo
	LoginLogo: {
		width: 120,
		height: 120,
		marginBottom: height / 20,
	},
	// --
	// Form container
	LoginFormCont: {
		//backgroundColor: 'red',
		width: '100%',
		borderRadius: 10,
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: height / 20,
	},
	// --
});

// Form styles
export const forms = StyleSheet.create({
	// Input Styles
	InputCont : {
		backgroundColor: colors.White,
		width: '100%',
		minHeight: 40,
		paddingHorizontal: 20,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
		position: 'relative',
	},
	CurrencyIndCont: {
		position: 'absolute',
		top: 7.5,
		right: 7.5,
		width: fzbase * 4,
        height: 25,
        borderRadius: 15, 
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.VTTurquoise,
        borderWidth: 1,
	},

	AlertInput: {
		borderColor: '#F42464',
		borderWidth: 1,
		backgroundColor: '#FCEBED',
	},
	OrangeInput: {
		borderColor: '#FFA222',
		borderWidth: 1,
		backgroundColor: 'rgba(255, 162, 34, 0.03)',
	},
	YellowInput: {
		borderColor: '#FFD753',
		borderWidth: 1,
		backgroundColor: 'rgba(255, 215, 83, 0.03)',
	},
	GreenInput: {
		borderColor: '#00CCCB',
		borderWidth: 1,
		backgroundColor: 'rgba(0, 204, 203, 0.03)',
	},
	Input: {
		backgroundColor: 'transparent',
		flex: 1,
		width: '100%',
		height: 44,
		alignItems: 'center',
		justifyContent: 'center',
		fontFamily: fonts.light,
		fontSize: fzbase * mult_04,
		color: colors.VTDarkGray,
		borderWidth: 0,
		flexWrap: 'wrap',
	},
	InputLogin: {
		backgroundColor: 'transparent',
		flex: 1,
		width: '50%',
		height: 44,
		alignItems: 'center',
		justifyContent: 'center',
		fontFamily: fonts.light,
		fontSize: fzbase * mult_04,
		color: colors.VTDarkGray,
		borderWidth: 0,
		flexWrap: 'wrap',
	},
	AutoCompleteContainer: {
		width: '100%',
		height: 44,
		borderWidth: 0,
	},
	AutoCompleteInput: {
		backgroundColor: 'pink',
	},
	Picker: {
		backgroundColor: 'transparent',
		width: '100%',
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		fontFamily: fonts.light,
		fontSize: fzbase * mult_04,
		color: colors.VTDarkGray,
	},
	DinamicPicker:{
		width: '85%',
		backgroundColor: 'white',
		marginLeft: 0,
		height: 40,
		borderRadius: 20,
		paddingHorizontal: 20,
	},
	// Picker select Styles
	PickerOverlay: {
		backgroundColor: colors.Facebook,
		justifyContent: 'center',
		alignItems: 'center',
		padding: width / 12,
	},
	PickerOptionCont: {
		backgroundColor: colors.White,
		width: '100%',
		marginHorizontal: 0,
		paddingVertical: 0,
		paddingHorizontal: 0,
		borderRadius: 12,
	},
	PickerOptionText: {
		color: colors.VTDarkGray,
		fontFamily: fonts.light,
		fontSize: fzbase * mult_04,
		paddingVertical: 15,
	},
	// --
	// Picker date Styles
	DatePickerCont: {
		backgroundColor: 'transparent',
		width: '100%',
		height: 40,
		alignItems: 'flex-start',
		justifyContent: 'center',
		position: 'relative',
	},
	DatePickerText: {
		backgroundColor: 'transparent',
		fontFamily: fonts.light,
		fontSize: fzbase * mult_04,
		color: colors.VTDarkGray,
	},
	// --
	inputIOS: {
		backgroundColor: 'transparent',
		flex: 1,
		width: '100%',
		height: 44,
		alignItems: 'center',
		justifyContent: 'center',
		fontFamily: fonts.light,
		fontSize: fzbase * mult_04,
		position: 'relative',
	},
	InputInteraction: {
		position: 'absolute',
		top: 5,
		right: 10,
		width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
	},
	RoundInteraction: {
		backgroundColor: colors.VTLightBlue,
		borderRadius: fzbase,
	},
	CenterAlingment: {
		textAlign: 'center',
	},
	LeftAlingment: {
		textAlign: 'left',
	},
	DinamicField:{
		backgroundColor: 'transparent',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 0,
		borderRadius: 0,
	},
	// --
});

// Buttons styles
export const buttons = StyleSheet.create({
	// Menu button
	MenuButton: {
		width: fzbase * 2.5,
		height: fzbase * 2.5,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: fzbase,
	},
	// Buttons
    GralButton: {
	    padding: 10,
	    justifyContent: 'center',
	    alignItems: 'center',
	    height: 42,
	    //borderRadius: 21,
	    flexDirection: 'row',
	    marginBottom: 10,
	    width: '100%',
	},
	ReopenGralButton: {
	    padding: 10,
	    justifyContent: 'center',
	    alignItems: 'center',
	    height: 42,
	    borderRadius: 21,
	    flexDirection: 'row',
	    marginBottom: -10,
	    width: '100%',
	},
    RoundButton: {
	    justifyContent: 'center',
	    alignItems: 'center',
	    height: fzbase * 3,
	    borderRadius: fzbase * 1.5,
	    width: fzbase * 3,
	    marginRight: 4,
	    position: 'absolute',
	    right: 0,
	    bottom: 13,
	},
    SmlButton: {
	    width: '60%',
	    justifyContent: 'center',
	    alignItems: 'center',
	    height: 35,
	    borderRadius: 19,
	    flexDirection: 'row',
	    marginVertical: 10,
	},
	FileUploadButton:{
		borderStyle: 'dashed',
		borderColor: colors.VTLightBlue,
		borderWidth: 1,
		marginBottom: fzbase * 1.3,
		borderRadius: fzbase,
		padding: fzbase * 1.5,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	FileUploadButtonIcon:{
		width: fzbase * 7,
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
	},	
	// Styles for Icon button
	IconButtonCont: {
		width: fzbase * 3.2,
		height: fzbase * 3.2,
		marginRight: fzbase,
		justifyContent: 'center',
		alignItems: 'center',
	},
	IconBigButtonCont: {
		width: fzbase * 4,
		height: fzbase * 4,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: fzbase * 0.5,
	},
	ButtonIcon: {
		width: 55,
		height: 42,
		alignItems: 'center',
		justifyContent: 'center',
		borderRightWidth: 1,
		borderColor: colors.VTBgGray,
	},
	// --
	// Variables de color para botones
	BLight: {
		backgroundColor: colors.White,
	},
	BLightBlue: {
		backgroundColor: colors.VTLightBlue,
	},
	BRed: {
		backgroundColor: '#F42464',
	},
	BDarkBlue: {
		backgroundColor: colors.VTDarkBlue,
	},
	BLineLight: {
		backgroundColor: 'transparent',
		borderColor: colors.White,
		borderWidth: 2,
	},
	BLineLightBlue: {
		backgroundColor: 'transparent',
		borderColor: colors.VTLightBlue,
		borderWidth: 2,
	},
	BLineLightRed: {
		backgroundColor: 'transparent',
		borderColor: 'red',
		borderWidth: 2,
	},
	BLineGray: {
		backgroundColor: 'transparent',
		borderColor: colors.VTLightGray,
		borderWidth: 2,
	},
	//////Nuevos colores Botoner
	ButtonAccentPurple: {
		backgroundColor: colors.AccentPurple,
	},
	ButtonFacebook: {
		backgroundColor: colors.Facebook,
	},
	ButtonGmail: {
		backgroundColor: colors.Gmail,
	},

	// --
	// Camera buttons
	CameraButtonHome: {
		width: fzbase * 13,
		height: fzbase * 13,
	},
	CameraButtonHomeImg: {
		width: fzbase * 13,
		height: fzbase * 13,
	},
	CameraButtonBig: {
		width: fzbase * 5.5,
		height: fzbase * 5.5,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'gray',
		borderRadius: fzbase * 2.75,
		marginHorizontal: fzbase * 3,
	},
	buttonCameraSide:{
		width: fzbase * 4,
		height: fzbase * 4,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: fzbase * 2,
		marginHorizontal: fzbase * 3,
	},
	buttonCameraMedium:{
		width: fzbase * 5,
		height: fzbase * 5,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: fzbase * 2.5,
		marginHorizontal: fzbase * 3,
	},
	// --
	// Progress bar buttonms
	ProgressBarBtn: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		paddingVertical: fzbase * 0.8,
	},
	ProgressBarBtnTex: {
		width: '70%',
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 5,
		fontSize: fzbase * mult_01,
	},
	// --
	// Main Tab button Styles
	MainTabButton: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		height: 35,
		position: 'relative',

	},
	MainTabButtonActive: {
		borderBottomWidth: (Platform.OS) === 'android' ? 8 : 4,
		borderColor: colors.Facebook,
	},
	MainTabText: {
		fontSize: fzbase * mult_02,
		fontFamily: fonts.bold,
		paddingBottom: 4,
	},
	LastTab: {
		borderLeftWidth: 2,
		borderColor: colors.VTLightBlue,
	},
	MainTabInd: {
		width: fzbase * 1.5,
		height: fzbase * 1.5,
		position: 'absolute',
		zIndex: 10,
		backgroundColor: 'white',
		right: -30,
		top: -2,
		borderRadius: fzbase * 0.75,
		justifyContent: 'center',
		alignItems: 'center',
	},
	// --
	// Photo `'review float button styles
	PhotoPreviewFloatButton: {
		width: fzbase * 4,
		height: fzbase * 4,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: fzbase * 2,
		position: 'absolute',
		top: 20,
		right: 20,
		zIndex: 999,
	},
	// --
});