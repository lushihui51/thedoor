import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { db } from './firebase';

export default function AddNewContactForm() {
    const [formState, setFormState] = useState({ success: false, error: false });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.target);
        const contactData = Object.fromEntries(formData);

        try {
            await addDoc(collection(db, 'contacts'), {
                ...contactData,
                lastMet: null,
                nextScheduledMeeting: null
            });

            setFormState({ success: true })
            e.target.reset();
        } catch (error) {
            setFormState({ error: { message: error.message } });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Your existing form fields stay the same */}
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input id="firstName" name="firstName" />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input id="lastName" name="lastName" />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input id="email" name="email" type="email" />
                </div>
                <div>
                    <label htmlFor="industry">Industry:</label>
                    <input id="industry" name="industry" />
                </div>
                <div>
                    <label htmlFor="company">Company:</label>
                    <input id="company" name="company" />
                </div>
                <div>
                    <label htmlFor="department">Department:</label>
                    <input id="department" name="department" />
                </div>
                <div>
                    <label htmlFor="role">Role:</label>
                    <input id="role" name="role" />
                </div>
                <div>
                    <label htmlFor="connectedThrough">Connected Through:</label>
                    <input id="connectedThrough" name="connectedThrough" />
                </div>
                <div>
                    <label htmlFor="background">Background:</label>
                    <textarea id="background" name="background" />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Contact'}
                </button>
                {formState.error && <p>Error: {formState.error.message}</p>}
                {formState.success && <p>Contact added successfully!</p>}
            </form>
        </div>
    );
}