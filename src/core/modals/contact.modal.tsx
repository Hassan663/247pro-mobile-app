// Define a type for common contact properties
type ContactCommon = {
    notes: string;
    fileAs: string;
    dismissed: boolean;
    prefix: string;
    suffix: string;
    jobTitle: string;
    nickName: string;
    lastName: string;
    contactTypeId: number;
    middleName: string;
    department: string;
    companyName: string;
    birthDate: string;
    companyVisible: boolean;
    deletedReason: number;
    createdDate: string;
    updatedDate: string;
    phoneticLast: string;
    deletedDate: string;
    phoneticFirst: string;
    deleteType: string;
    phoneticMiddle: string;
    profilePicture: string;
    firstName: string;
};

// Interface for creating a contact
export interface IContactCreateModel extends ContactCommon {
    contactSpecialities: {
        specialtyId: number;
        specialtyName: string;
    }[];
    contactTags: {
        tagId: string;
        tagName: string;
    }[];
    contactEmails: {
        email: string;
        label: string;
        visible: boolean;
    }[];
    contactPhones: {
        phone: string;
        label: string;
        visible: boolean;
        countryId: number;
    }[];
    contactOthers: {
        label: string;
        value: string;
        contactOtherTypeId: string;
    }[];
    contactAddresses: {
        city: string;
        poBox: string;
        label: string;
        zipCode: string;
        stateText: string;
        streetAddress: string;
        streetAddressLine2: string;
        latitude: number;
        longitude: number;
        visible: boolean;
        stateId: string;
        countryId: number;
        provinceId: string;
        provinceText: string;
    }[];
}

// Interface for updating a contact
export interface IContactUpdateModel extends ContactCommon {
    id: number;
    contactTags: {
        tagId: string;
        contactId: number;
        tagName: string;
    }[];
    contactEmails: {
        email: string;
        label: string;
        visible: boolean;
        id: number;
        contactId: number;
    }[];
    contactPhones: {
        phone: string;
        label: string;
        visible: boolean;
        countryId: number;
        id: number;
        contactId: number;
    }[];
    contactOthers: {
        label: string;
        value: string;
        contactOtherTypeId: string;
        id: number;
        contactId: number;
    }[];
    contactAddresses: {
        city: string;
        poBox: string;
        label: string;
        zipCode: string;
        stateText: string;
        streetAddress: string;
        streetAddressLine2: string;
        latitude: number;
        longitude: number;
        visible: boolean;
        stateId: string;
        countryId: number;
        provinceId: string;
        provinceText: string;
        id: number;
        contactId: number;
    }[];
}

// ContactModal class that combines IContactCreateModel and IContactUpdateModal
export class ContactModel implements IContactCreateModel, IContactUpdateModel {
    // Properties from ContactCommon
    notes: string = "";
    fileAs: string = "";
    dismissed: boolean = false;
    prefix: string = "";
    suffix: string = "";
    jobTitle: string = "";
    nickName: string = "";
    lastName: string = "";
    contactTypeId: number = 0;
    middleName: string = "";
    department: string = "";
    companyName: string = "";
    birthDate: string = "";
    companyVisible: boolean = false;
    deletedReason: number = 0;
    createdDate: string = "";
    updatedDate: string = "";
    phoneticLast: string = "";
    deletedDate: string = "";
    phoneticFirst: string = "";
    deleteType: string = "";
    phoneticMiddle: string = "";
    profilePicture: string = "";
    firstName: string = "";
    // Additional properties from IContactCreateModel
    contactSpecialities: { specialtyId: number; specialtyName: string }[] = [];
    contactTags: { tagId: string; contactId: number; tagName: string }[] = [];

    contactEmails: {
        email: string;
        label: string;
        visible: boolean;
        id: number;         // Add the 'id' property here
        contactId: number;  // Add the 'contactId' property here
    }[] = [];
    contactPhones: {
        phone: string;
        label: string;
        visible: boolean;
        countryId: number;
        id: number;         // Added id property
        contactId: number;  // Added contactId property
    }[] = [];
    contactOthers: {
        label: string;
        value: string;
        contactOtherTypeId: string;
        id: number; // Add id property
        contactId: number; // Add contactId property
    }[] = [];
    contactAddresses: {
        city: string;
        poBox: string;
        label: string;
        zipCode: string;
        stateText: string;
        streetAddress: string;
        streetAddressLine2: string;
        latitude: number;
        longitude: number;
        visible: boolean;
        stateId: string;
        countryId: number;
        provinceId: string;
        provinceText: string;
        id: number; // Assuming it's of type number, similar to the id property in IContactUpdateModal
        contactId: number; // Assuming it's of type number, similar to the contactId property in IContactUpdateModal
    }[] = [];
    // Additional properties from IContactUpdateModal
    id: number = 0;
}
