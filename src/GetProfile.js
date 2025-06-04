import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";

export default function GetProfile({ contactId }) {
    const [isLoading, setIsLoading] = useState(true);
    const [contactData, setContactData] = useState(null);
    const [meetingDatas, setMeetingDatas] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const contactSnap = await getDoc(doc(db, 'contacts', contactId));
                if (!contactSnap.exists()) {
                    throw new Error("Contact not found");
                }
                const localContactData = contactSnap.data()
                const meetingPromises = localContactData.meetings.map(meetingId =>
                    getDoc(doc(db, 'meetings', meetingId))
                );
                const meetingSnaps = await Promise.all(meetingPromises);
                setContactData(localContactData);
                setMeetingDatas(meetingSnaps.map(meetingSnap => meetingSnap.data()))

            } catch (error) {
                console.error('Error: ', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [contactId]);
    console.log(contactData);
    console.log(meetingDatas);
    return (
        <div>
            {isLoading ? (<p>Fetching...</p>) :
                <div>
                    {Object.entries(contactData).map(([key, value]) =>
                        <p key={key}>{key}: {value}</p>
                    )}

                    {meetingDatas.map((meetingData, index) => (
                        <div key={index}>
                            <p>Meeting {index + 1}</p>
                            {Object.entries(meetingData).map(([key, value]) =>
                                <p key={key}>{key}: {value}</p>
                            )}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}