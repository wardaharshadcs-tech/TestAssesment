# Playwright Automation Suite — Permission.io

This repository contains an **end-to-end automation suite** for testing core features of [Permission.io](https://ask.permission.io), built with **Playwright + TypeScript** using **Page Object Model (POM)** design.  

The suite covers:
- 🔑 Authentication (login flows, captcha handling, lockout scenarios)  
- 🤖 AI Agent (pre-chat validation & chat interaction)  
- 🧩 Clean reusable logic with BasePage utilities  
- ⚙️ Configurable `.env` variables for credentials  

## 🚀 Tech Stack
- [Playwright](https://playwright.dev/) (E2E testing)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Faker.js](https://fakerjs.dev/) (for test data)  
- [Dotenv](https://github.com/motdotla/dotenv) (env variable management)  

## 📂 Project Structure
playwright-assignment/
│
├── pages/ # Page Object Models (POM)
│ ├── BasePage.ts # Common reusable actions (navigation, cookies, captcha)
│ ├── LoginPage.ts # Login-related actions & assertions
│ └── AiAgentPage.ts # AI Agent chat page actions & assertions
│
├── tests/ # Test specs
│ ├── login.spec.ts # Login flows (valid, invalid, locked user)
│ ├── ai.spec.ts # AI Agent Pre-Chat validation
│ └── ai-chat.spec.ts # AI Agent Chat interaction tests
│
├── utils/
│ └── testData.ts # Test data (faker, env-driven accounts)
│
├── .env # Local environment variables
├── playwright.config.ts # Playwright test runner config
└── README.md


## ⚙️ Setup & Installation
1. **Clone repo**
   ```bash
   git clone https://github.com/<your-username>/playwright-assignment.git
   cd playwright-assignment


npm install

USER_EMAIL=your_valid_email
USER_PASSWORD=your_valid_password

LOCKOUT_TEST_EMAIL=anibal_hartmann2@yahoo.com
LOCKOUT_TEST_PASSWORD=KDuUica74NqS

CAPTCHA_MODE=manual        # options: manual | skip
CAPTCHA_TIMEOUT=240000     # 4 minutes

Run all tests in headed Chrome:
npx playwright test --headed --project=chrome


npx playwright test --headed --project=chrome

Run only AI chat tests:
npx playwright test tests/ai-chat.spec.ts --headed

Playwright’s built-in reporter can be opened with:
npx playwright show-report

📌 Notes

Captcha is manual → test will pause up to 4 minutes for solving, then resume.

Profile button name (WA Wardah Arshad) can be parameterized if multiple users are tested.

Lockout test user is configured via .env.
