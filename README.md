# ConDutCal
Consumer Duty Calculator

ConDutCal is a proposed project to create a calculator to allow customers leasing equipment to see how much extra they're paying compared with if they bought outright. This is intended to align with the "act to deliver good outcomes for retail customers." part of the FCA's Consumer Duty rules. The calculator will follow WCAG accessibility standards where possible, in alignment with the "staff working in product and service design or transformation programmes should take vulnerable customers’ needs into account as part of the design process or transformation agenda" section of the FCA Guidance for the fair treatment of vulnerable customers. The calculator should align with the organisation's branding & colour scheme guidelines. Commits should follow the conventional commits format for consistency.

#### Requirements

##### Brand & Colour Scheme Guidelines
The project must follow the below brand/colour scheme guidelines, taken from the organisation's official branding guidelines:
| Role | Value |
| :--- | :--- |
| Primary Font | 'Inter' |
|Secondary Font | 'Fira Code' |
| Primary Text | `#1A1A1A` |
| Secondary Text | `#595959` |
| Brand / Link | `#005A9C` |
| Error / Warning | `#D32F2F` |
| Background | `#FFFFFF` |

###### Material Design Theme
A custom theme for the Material Design library was generated using https://material-foundation.github.io/material-theme-builder/ for use in Figma and in the MVP - and then added to the project repository as material-theme.zip and material-theme.json.

##### Functional Requirements

These requirements were gathered from interviews with the Sales Team & the Compliance Team to ensure the calculator serves the customer-facing side of the business as well as meeting FCA standards.

###### User Inputs

| Requirement ID | Requirement | Rationale |
| :--- | :--- | :--- |
| FU-01 | The calculator must accept the exact invoice value of the equipment (the cost to buy outright) | The calculator can't make a comparison without this figure |
| FU-02 | The calculator must take input for the First Payment amount, Ongoing Payment amount, and Term Length (in months) | These are required to calculate the total cost of the lease |
| FU-03 | The calculator must allow the inclusion of any mandatory End-Of-Term (e.g. disposal, collection, or documentation) fees | Hiding these fees would violate the FCA's 'Price and Value' principle - firms must account for the full lifecycle cost |
| FU-04 | The calculator must include some kind of toggle and/or input for Maintenance/Service costs if they're included in the lease but not the invoice value | Leases often include servicing, which accounts for some of the extra cost, and should be quantified fairly | 

###### System Calculations

| Requirement ID | Requirement | Rationale |
| :--- | :--- | :--- |
| FU-05 | The calculator should calculate the Total Lease Cost as follows: First Payment + (Monthly Rental x Term) + End-Of-Term Fees | Required to show the full lifetime cost |
| FU-06 | The calculator should calculate the Total Additional Cost as follows: Total Cost of Lease  - Invoice Value - Estimated Servicing Costs | Meets the core function for the user |
| FU-07 | The calculator should calculate the Equivalent/Effective APR (Annual Percentage Rate) of the lease | Requested by Compliance to allow customers to compare the lease against a bank loan |

###### Outputs/User Experience

| Requirement ID | Requirement | Rationale |
| :--- | :--- | :--- |
| FU-08 | The results must include a side-by-side visual comparison (for example a stacked bar chart) comparing 'Total Purchase Cost' with 'Total Lease Cost' | Visual aids are key to meeting the FCA's 'Consumer Understanding' outcome, especially for vulnerable customers. |
| FU-09 | The calculator must generate a plain-English summary - e.g. "Leasing this equipment over 36 months costs £2400 more than buying it outright." | Provides the comparison figure to the user |

##### Prototyping
A prototype was built using Figma Design in order to quickly get stakeholder feedback. We decided to leverage the open source Material Design library in order avoid having to create components from scratch, and to align with a future overhaul of the organisation's website which is being considered.
