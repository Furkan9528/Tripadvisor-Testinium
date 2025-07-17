Feature: TripAdvisor homepage
# This feature file for navigating to homepage

    Background:
        Given I navigate to the TripAdvisor main page
        Then I should see the TripAdvisor logo
        And I should see the search bar
        And I should see the Sign In button

    Scenario: Verify the destionation field
        Given I click to the destionation field
        Then I will see the list of popular destionations displayed

    @Random
    Scenario: Assign a new destination to a destination field
        # Purpose: Destination assignment
        Given I click to the destionation field
        When I select a random destination from the list
        Then I will be redirected to the discovery page
        And I will see the header Things to do
        # Purpose: I am redirected to the discovery page
        When I select a random place from the list
        Then I should be redirected to the newly opened tab for the place
        And I should see the description of the selected place in the new tab
        # Purpose : Verify the opening days and hours for the place
        Then I should see the following opening hours:
        And I should see the scores of the places
        # | Day       | Hours               |
        # | Tuesday   | 8:45 AM - 11:45 PM  |
        # | Wednesday | 8:45 AM - 11:45 PM  |
        # | Thursday  | 8:45 AM - 11:45 PM  |
        # | Friday    | 8:45 AM - 11:45 PM  |
        # | Saturday  | 6:00 PM - 11:45 PM  |
        # | Sunday    | 8:45 AM - 11:45 PM  |
        # | Monday    | Closed              |
