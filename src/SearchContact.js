import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";

export default function SearchContact() {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchContacts = async () => {
            setIsLoading(true);
            try {
                const snapshot = await getDocs(collection(db, 'contacts'));
                const contactList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setContacts(contactList);
            } catch (error) {
                console.error('Error: ', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContacts();
    }, [])

    const filterdContacts = contacts.filter(contact => {
        if (!searchTerm) return true;

        const searchLower = searchTerm.toLowerCase();
        const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
        const company = contact.company?.toLowerCase() || '';
        const email = contact.email?.toLowerCase() || '';
        const role = contact.role?.toLowerCase() || '';

        return fullName.includes(searchLower) ||
            company.includes(searchLower) ||
            email.includes(searchLower) ||
            role.includes(searchLower);
    })

    const handleSelectContact = (contact) => {
        console.log('Selected contact:', contact);
        // Pass this to a parent component or handle it here
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    return (
        <div>
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by name, company, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Search Status */}
            <div>
                {searchTerm ? (
                    <span>Found {filterdContacts.length} contact{filterdContacts.length == 1 ? 's' : ''}</span>) :
                    <span>Showing all {contacts.length} contacts</span>}
            </div>
            {/* Search Results */}
            <div>
                {isLoading ? (<p>Fetching...</p>) : filterdContacts.length === 0 ? (<p>No contacts found</p>) : filterdContacts.map(contact => {
                    console.log(contact.firstName);
                    return <p key={contact.id}>{`${contact.firstName} ${contact.lastName}`}</p>
                })}
            </div>
        </div>
    )
}