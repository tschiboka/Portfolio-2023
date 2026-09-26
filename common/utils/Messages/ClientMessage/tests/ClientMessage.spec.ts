import { describe, it, expect } from 'vitest'
import { ClientMessage } from '../ClientMessage'

describe('ClientMessage.Success', () => {
    it.each([
        ['Created', 'category', 'Category created'],
        ['Updated', 'category', 'Category updated'],
        ['Deleted', 'category', 'Category deleted'],
        ['Saved', 'profile', 'Profile saved'],
        ['Submitted', 'category', 'Category submitted'],
        ['Sent', 'message', 'Message sent'],
        ['Verified', 'email', 'Email verified'],
        ['Copied', 'link', 'Link copied'],
        ['Uploaded', 'avatar', 'Avatar uploaded'],
        ['Registered', 'account', 'Account registered'],
        ['LoggedIn', 'user', 'User logged in'],
        ['LoggedOut', 'user', 'User logged out'],
    ] as const)('%s capitalises the resource', (key, resource, expected) => {
        expect(ClientMessage.Success[key](resource)).toBe(expected)
    })

    it('leaves an already-capitalised resource unchanged', () => {
        expect(ClientMessage.Success.Created('Category')).toBe('Category created')
    })

    it('handles a multi-word resource', () => {
        expect(ClientMessage.Success.Verified('email address')).toBe('Email address verified')
    })

    it.each(['', '   '])('returns the suffix only for an empty-ish resource: %j', (resource) => {
        expect(ClientMessage.Success.Created(resource)).toBe(`${resource} created`)
    })
})

describe('ClientMessage.Failure', () => {
    it.each([
        ['Create', 'category', 'Failed to create category'],
        ['Update', 'category', 'Failed to update category'],
        ['Delete', 'category', 'Failed to delete category'],
        ['Save', 'profile', 'Failed to save profile'],
        ['Fetch', 'categories', 'Failed to fetch categories'],
        ['Load', 'page', 'Failed to load page'],
        ['Send', 'message', 'Failed to send message'],
        ['Verify', 'email', 'Failed to verify email'],
        ['Submit', 'form', 'Failed to submit form'],
        ['Join', 'session', 'Failed to join session'],
        ['Handle', 'message', 'Failed to handle message'],
    ] as const)('%s lowercases the resource', (key, resource, expected) => {
        expect(ClientMessage.Failure[key](resource)).toBe(expected)
    })

    it('lowercases an already-capitalised resource', () => {
        expect(ClientMessage.Failure.Create('Category')).toBe('Failed to create category')
    })

    it.each([
        ['Login', 'Failed to log in'],
        ['Logout', 'Failed to log out'],
    ] as const)('%s takes no resource', (key, expected) => {
        expect(ClientMessage.Failure[key]()).toBe(expected)
    })
})

describe('ClientMessage.Progress', () => {
    it.each([
        ['Loading', 'categories', 'Loading categories…'],
        ['Saving', 'profile', 'Saving profile…'],
        ['Deleting', 'category', 'Deleting category…'],
        ['Updating', 'settings', 'Updating settings…'],
        ['Sending', 'message', 'Sending message…'],
        ['Verifying', 'email', 'Verifying email…'],
        ['Uploading', 'avatar', 'Uploading avatar…'],
        ['Fetching', 'visits', 'Fetching visits…'],
        ['Submitting', 'form', 'Submitting form…'],
    ] as const)(
        '%s lowercases the resource and ends with an ellipsis',
        (key, resource, expected) => {
            expect(ClientMessage.Progress[key](resource)).toBe(expected)
        },
    )

    it('always ends with the ellipsis character', () => {
        expect(ClientMessage.Progress.Loading('categories').endsWith('…')).toBe(true)
    })
})

describe('ClientMessage.Empty', () => {
    it.each([
        ['NoResults', 'categories', 'No categories found'],
        ['NothingYet', 'messages', 'No messages yet'],
    ] as const)('%s lowercases the resource', (key, resource, expected) => {
        expect(ClientMessage.Empty[key](resource)).toBe(expected)
    })

    it.each([
        ['NotSelected', 'Nothing selected'],
        ['NoItems', 'No items to display'],
    ] as const)('%s takes no resource', (key, expected) => {
        expect(ClientMessage.Empty[key]()).toBe(expected)
    })

    it.each([
        ['adding a category', 'Start by adding a category'],
        ['Creating A Category', 'Start by creating a category'],
    ])('StartBy lowercases the action: %s', (action, expected) => {
        expect(ClientMessage.Empty.StartBy(action)).toBe(expected)
    })
})

describe('ClientMessage.Confirm', () => {
    it('lowercases the resource in Delete', () => {
        expect(ClientMessage.Confirm.Delete('Category')).toBe('Delete this category?')
    })

    it.each([
        ['Discard', 'Discard your changes?'],
        ['Unsaved', 'You have unsaved changes'],
        ['CannotBeUndone', 'This action cannot be undone'],
    ] as const)('%s takes no resource', (key, expected) => {
        expect(ClientMessage.Confirm[key]()).toBe(expected)
    })
})

describe('ClientMessage.Network', () => {
    it.each([
        ['Offline', 'You appear to be offline'],
        ['Timeout', 'The request timed out'],
        ['Generic', 'Something went wrong'],
        ['TryAgain', 'Please try again'],
        ['TryAgainLater', 'Please try again later'],
        ['SessionExpired', 'Your session has expired'],
        ['Unauthorised', 'You do not have access to this'],
    ] as const)('%s returns fixed wording', (key, expected) => {
        expect(ClientMessage.Network[key]()).toBe(expected)
    })
})

describe('ClientMessage shape', () => {
    const groups = Object.keys(ClientMessage)

    it('exposes the expected groups', () => {
        expect(groups).toEqual(['Success', 'Failure', 'Progress', 'Empty', 'Confirm', 'Network'])
    })

    it.each(groups)('%s contains only functions', (group) => {
        const members = Object.values(ClientMessage[group as keyof typeof ClientMessage])
        expect(members.every((member) => typeof member === 'function')).toBe(true)
    })

    it('never returns an empty string', () => {
        const renders = [
            ClientMessage.Success.Created('x'),
            ClientMessage.Failure.Create('x'),
            ClientMessage.Progress.Loading('x'),
            ClientMessage.Empty.NoResults('x'),
            ClientMessage.Confirm.Delete('x'),
            ClientMessage.Network.Generic(),
        ]

        expect(renders.every((message) => message.length > 0)).toBe(true)
    })
})
