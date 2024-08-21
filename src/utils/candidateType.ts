interface candidateType {
  application_id: string;

  type: string;

  status: string;

  is_blacklist: false;

  in_merit_list: false;

  created_at: string;

  primary_contact: string;

  candidate_details: {
    first_name: string;

    middle_name: string;

    last_name: string;

    contact_number: string;

    email: string;

    nationality: string;

    religion: string;

    category: string;

    dob: string;

    gender: string;

    is_critical_ailment: false;

    critical_ailment: string;

    profile_photo: string;

    moodle_id: null;
  };

  application_details: {
    applying_for: string;

    admission_year: string;

    current_class: string;

    percentage_secured: string;

    caste: string;

    school_name: string;

    board: string;

    other_board: null;

    medium: string;

    other_medium: null;
  };

  address_details: {
    is_same_as_permanent_address: false;

    permanent_address: {
      permanent_address: string;

      country: string;

      states: string;

      cities: string;

      district: string;

      pin_code: string;
    };

    current_address: {
      current_address: string;

      country: string;

      states: string;

      cities: string;

      district: string;

      pin_code: string;
    };
  };

  parent_details: {
    father_name: string;

    father_occupation: string;

    father_annual_income: string;

    father_contact_number: string;

    father_email: string;

    mother_name: string;

    mother_occupation: string;

    mother_annual_income: string;

    mother_contact_number: string;

    mother_email: string;

    guardian_name: string;

    guardian_occupation: string;

    guardian_annual_income: string;

    guardian_contact_number: string;

    guardian_email: string;

    guardian_relation: string;
  };

  fee_details: {
    payment_date: string;

    payment_mode: string;

    reciept_no: string;

    txn_id: null;

    payment_obj: null;
  };

  additional_details: {
    q1_name: string;

    q1_relationship: string;

    q1_year: string;

    q2_name: string;

    q2_department: string;

    q2_relationship: string;
  };
}


export {candidateType}