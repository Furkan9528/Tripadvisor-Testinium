Feature: Ecommerce validations

    Scenario: Verify homepage is displayed correctly
        Given I navigate to the TripAdvisor main page
        Then I should see the TripAdvisor logo
        And I should see the search bar
        And I should see the Sign In button
