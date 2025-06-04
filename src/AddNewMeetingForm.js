import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from './firebase';
import SearchContact from './SearchContact';

export default function AddNewMeetingForm() {
    const [formState, setFormState] = useState({ success: false, error: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [attendees, setAttendees] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormState({ success: false, error: null });

        const formData = new FormData(e.target);
        const meetingData = Object.fromEntries(formData);

        try {
            const meetingRef = await addDoc(collection(db, 'meetings'), {
                ...meetingData,
                attendees: attendees.map(attendee => attendee.id)
            });

            for (const attendee of attendees) {
                await updateDoc(doc(db, 'contacts', attendee.id), {
                    meetings: arrayUnion(meetingRef.id)
                })
            }

            setFormState({ success: true });
            setAttendees([]);
            e.target.reset();
        } catch (error) {
            setFormState({ error: { message: error.message } });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSelectContact = (contact) => {
        setAttendees(prevAttendees => {
            if (prevAttendees.some(attendee => attendee.id === contact.id)) {
                return prevAttendees;
            }
            return [...prevAttendees, contact]
        });
    }

    const handleDeselectContact = (contact) => {
        setAttendees(prevAttendees =>
            prevAttendees.filter(attendee => attendee.id !== contact.id)
        )
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    {attendees.map(attendee => {
                        return <button key={attendee.id} type='button' onClick={() => handleDeselectContact(attendee)}>{`${attendee.firstName} ${attendee.lastName}`}</button>
                    })}
                    <SearchContact handleSelectContact={handleSelectContact} />
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