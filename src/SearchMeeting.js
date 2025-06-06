import { collection, getDocs, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";

export default function SearchMeeting() {
    const [meetings, setMeetings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        const fetchMeetings = async () => {
            setIsloading(true)
            try {
                const snapshot = await getDocs(collection(db, 'meetings'));
                const meetingsList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMeetings(meetingsList);
            } catch (error) {
                console.error('Error: ', error);
            } finally {
                setIsloading(false)
            }
        }

        fetchMeetings();
    }, []);

    const filterdMeetings = meetings.filter(meeting => {
        if (!searchTerm) return true;

        const searchLower = searchTerm.toLowerCase();
        const meetingDate = meeting.meetingDate?.toLowerCase() || '';
        const meetingLocation = meeting.meetingLocation?.toLowerCase() || '';
        const meetingStatus = meeting.meetingStatus?.toLowerCase() || '';

        return meetingDate.includes(searchLower) ||
            meetingLocation.includes(searchLower) ||
            meetingStatus.includes(searchLower);
    })

    const clearSearch = () => {
        setSearchTerm('');
    }

    const handleSelectMeeting = (meetingId) => {
        console.log(`selected meeting: ${meetingId}`);
    }

    return (
        <>
            <div>
                {/* Search Input */}
                <input
                    id="searchField"
                    type="text"
                    placeholder="Search by meeting date, meeting location, or meeting status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* Search Status */}
                <div>
                    {searchTerm ? (
                        <span>Found {filterdMeetings.length} meeting{filterdMeetings.length === 1 ? 's' : ''}</span>) :
                        <span>Showing all {meetings.length} meetings</span>}
                </div>
                {/* Search Results */}
                <div>
                    {isLoading ? (<p>Fetching...</p>) : filterdMeetings.length === 0 ? (<p>No meetings found</p>) : filterdMeetings.map(meeting => {
                        return <button key={meeting.id} type="button" onClick={() => handleSelectMeeting(meeting.id)}>{`${meeting.id}`}</button>
                    })}
                </div>
            </div>
        </>
    )
} 