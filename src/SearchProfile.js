import { useState } from "react";
import GetProfile from "./GetProfile";
import SearchContact from "./SearchContact";

export default function SearchProfile() {

    const [selectedProfile, setSelectedProfile] = useState(null);
    const handleSelectContact = (contact) => {
        setSelectedProfile(contact.id);
    }

    return (
        <>
            <SearchContact handleSelectContact={handleSelectContact} />
            {selectedProfile !== null && <GetProfile contactId={selectedProfile} />}
        </>
    )
}