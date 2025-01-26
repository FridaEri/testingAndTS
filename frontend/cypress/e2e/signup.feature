Feature: User sign-up

Scenario: User signs up with valid data
  Given the user is on the sign-up page
  When they enter "Anna Andersson" as the name
  When they enter "anna.andersson@example.com" as the email
  When they enter "Sveavägen 45, Stockholm" as the address
  When they enter "11346" as the postal code
  When they enter "StrongPassword123" as the password
  When they submit the form
  Then they should see a success message
  Then the form fields should be cleared
