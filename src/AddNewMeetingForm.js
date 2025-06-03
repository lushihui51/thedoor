import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from './firebase';

export default function AddMeetingForm() {
    const [formState, setFormState] = useState({ success: false, error: false });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.target);
        const meetingData = Object.fromEntries(formData);

        try {
            await addDoc(collection(db, 'meetings'), {
                ...meetingData
            });
            setFormState({ success: true })
        } catch (error) {
            setFormState({ error: { message: error.message } });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="dateReachedOut">Date reached out:</label>
                    <input id="dateReachedOut" name="dateReachedOut" />
                </div>
                <div>
                    <label htmlFor="reachOutEmail">Reach out email:</label>
                    <textarea id="reachOutEmail" name="reachOutEmail" />
                </div>
                <div>
                    <label htmlFor="meetingDate">Meeting Date:</label>
                    <input id="meetingDate" name="meetingDate" />
                </div>
                <div>
                    <label htmlFor="meetingLocation">Meeting Location:</label>
                    <input id="meetingLocation" name="meetingLocation" />
                </div>
                <div>
                    <label htmlFor="meetingPreparation">Meeting Preparation:</label>
                    <textarea id="meetingPreparation" name="meetingPreparation" />
                </div>
                <div>
                    <label htmlFor="meetingNotes">Meeting Notes:</label>
                    <textarea id="meetingNotes" name="meetingNotes" />
                </div>
                <div>
                    <label htmlFor="meetingStatus">Meeting Status</label>
                    <input id="meetingStatus" name="meetingStatus" />
                    {/* options: pending, reached out, scheduled, completed */}
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Meeting'}
                </button>
                {formState.error && <p>Error: {formState.error.message}</p>}
                {formState.success && <p>Meeting added successfully!</p>}
            </form>
        </div>
    );
}