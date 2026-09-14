import { Strings } from '../../Strings'

/* Canonical FE wording — mirrors the BE ApiMessage. Grammar first, tone second. */
export const ClientMessage = {
    Success: {
        Created: (r: string) => `${Strings.capitalise(r)} created`,
        Updated: (r: string) => `${Strings.capitalise(r)} updated`,
        Deleted: (r: string) => `${Strings.capitalise(r)} deleted`,
        Saved: (r: string) => `${Strings.capitalise(r)} saved`,
        Submitted: (r: string) => `${Strings.capitalise(r)} submitted`,
        Sent: (r: string) => `${Strings.capitalise(r)} sent`,
        Verified: (r: string) => `${Strings.capitalise(r)} verified`,
        Copied: (r: string) => `${Strings.capitalise(r)} copied`,
        Uploaded: (r: string) => `${Strings.capitalise(r)} uploaded`,
        Registered: (r: string) => `${Strings.capitalise(r)} registered`,
        LoggedIn: (r: string) => `${Strings.capitalise(r)} logged in`,
        LoggedOut: (r: string) => `${Strings.capitalise(r)} logged out`,
    },

    Failure: {
        Create: (r: string) => `Failed to create ${r.toLowerCase()}`,
        Update: (r: string) => `Failed to update ${r.toLowerCase()}`,
        Delete: (r: string) => `Failed to delete ${r.toLowerCase()}`,
        Save: (r: string) => `Failed to save ${r.toLowerCase()}`,
        Fetch: (r: string) => `Failed to fetch ${r.toLowerCase()}`,
        Load: (r: string) => `Failed to load ${r.toLowerCase()}`,
        Send: (r: string) => `Failed to send ${r.toLowerCase()}`,
        Verify: (r: string) => `Failed to verify ${r.toLowerCase()}`,
        Submit: (r: string) => `Failed to submit ${r.toLowerCase()}`,
        Login: () => 'Failed to log in',
        Logout: () => 'Failed to log out',
    },

    Progress: {
        Loading: (r: string) => `Loading ${r.toLowerCase()}…`,
        Saving: (r: string) => `Saving ${r.toLowerCase()}…`,
        Deleting: (r: string) => `Deleting ${r.toLowerCase()}…`,
        Updating: (r: string) => `Updating ${r.toLowerCase()}…`,
        Sending: (r: string) => `Sending ${r.toLowerCase()}…`,
        Verifying: (r: string) => `Verifying ${r.toLowerCase()}…`,
        Uploading: (r: string) => `Uploading ${r.toLowerCase()}…`,
        Fetching: (r: string) => `Fetching ${r.toLowerCase()}…`,
        Submitting: (r: string) => `Submitting ${r.toLowerCase()}…`,
    },

    Empty: {
        NoResults: (r: string) => `No ${r.toLowerCase()} found`,
        NothingYet: (r: string) => `No ${r.toLowerCase()} yet`,
        NotSelected: () => 'Nothing selected',
        NoItems: () => 'No items to display',
        StartBy: (action: string) => `Start by ${action.toLowerCase()}`,
    },

    Confirm: {
        Delete: (r: string) => `Delete this ${r.toLowerCase()}?`,
        Discard: () => 'Discard your changes?',
        Unsaved: () => 'You have unsaved changes',
        CannotBeUndone: () => 'This action cannot be undone',
    },

    Network: {
        Offline: () => 'You appear to be offline',
        Timeout: () => 'The request timed out',
        Generic: () => 'Something went wrong',
        TryAgain: () => 'Please try again',
        TryAgainLater: () => 'Please try again later',
        SessionExpired: () => 'Your session has expired',
        Unauthorised: () => 'You do not have access to this',
    },
} as const
