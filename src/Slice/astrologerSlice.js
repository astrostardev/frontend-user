import { createSlice } from "@reduxjs/toolkit";

const astrologerSlice = createSlice({
    name: 'astrologers',
    initialState: {
        isAuthenticated: false,
        loading: false,
        // astrologers: [], // Initial empty array to hold astrologers data
        error: null // Initial error state
    },
    reducers: {
        getAllAstrologerRequest(state, action) {

            return {
                ...state,
                loading: true,
                error: null // Clear any previous errors
            }
        },
        getAllAstrologerSuccess(state, action) {

            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                astrologers: action.payload.astrologers, // Update astrologers data
                error: null // Clear any previous errors
            }
        },
        getAllAstrologerFail(state, action) {
            console.error("Error fetching astrologers:", action.payload);
            return {
                ...state,
                loading: false,
                error: action.payload // Set error state
            }
        },
        availAstrologerCallRequest(state, action) {

            return {
                ...state,
                loading: true,
                error: null // Clear any previous errors
            }
        },
        availAstrologerCallSuccess(state, action) {

            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                callAvailable: action.payload.callAvailable, // Update astrologers data
                error: null // Clear any previous errors
            }
        },
        availAstrologerCallFail(state, action) {
            console.error("Error fetching astrologers:", action.payload);
            return {
                ...state,
                loading: false,
                error: action.payload // Set error state
            }
        },
        availAstrologerChatRequest(state, action) {

            return {
                ...state,
                loading: true,
                error: null // Clear any previous errors
            }
        },
        availAstrologerChatSuccess(state, action) {

            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                chatAvailable: action.payload.chatAvailable, // Update astrologers data
                error: null // Clear any previous errors
            }
        },
        availAstrologerChatFail(state, action) {
            console.error("Error fetching astrologers:", action.payload);
            return {
                ...state,
                loading: false,
                error: action.payload // Set error state
            }
        },

        isAstrologerBusyRequest(state, action) {
            return {
                ...state,
                loading: true,
                error: null // Clear any previous errors
            }
        },
        isAstrologerBusySuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                astrologer: action.payload,
                error: null // Clear any previous errors
            }
        },
        isAstrologerBusyFail(state, action) {
            console.error("Error checking astrologer busy status:", action.payload);
            return {
                ...state,
                loading: false,
                error: action.payload // Set error state
            }
        },
        sendChatDetailToAStrologerRequest(state, action) {
            return {
                ...state,
                loading: true,
                error: null // Clear any previous errors
            }
        },
        sendChatDetailToAStrologerSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                astrologer: action.payload,
                error: null // Clear any previous errors
            }
        },
        sendChatDetailToAStrologerFail(state, action) {
            console.error("Error checking astrologer busy status:", action.payload);
            return {
                ...state,
                loading: false,
                error: action.payload // Set error state
            }
        }      
    }
});

const { actions, reducer } = astrologerSlice;

export const {
    isAstrologerBusyFail,
    isAstrologerBusySuccess,
    isAstrologerBusyRequest,
    getAllAstrologerFail,
    getAllAstrologerRequest,
    getAllAstrologerSuccess,
    availAstrologerCallFail,
    availAstrologerCallRequest,
    availAstrologerCallSuccess,
    availAstrologerChatFail,
    availAstrologerChatRequest,
    availAstrologerChatSuccess,
    sendChatDetailToAStrologerFail,
    sendChatDetailToAStrologerRequest,
    sendChatDetailToAStrologerSuccess
} = actions;

export default reducer;
