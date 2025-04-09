# **App Name**: WinPredict Mini

## Core Features:

- Telegram Authentication: Implement Telegram Mini App Authentication using initData for secure user access.
- Unified StateView: Develop a unified StateView component to manage loading, error, empty, and content states for a seamless user experience.
- Prediction Contests: Implement binary (Yes/No) prediction contests for WinCoins.
- Wallet Integration: Integrate wallet functionality for Wincoin, Wincent, and Wingem within the mini app.
- AI-Powered Insights: Utilize AI to generate insights from user predictions. Display leaderboards and stats. The AI tool will reason about when it has enough data to generate meaningful insights.

## Style Guidelines:

- Primary color: Telegram blue (#2AABEE) for brand consistency.
- Secondary color: Light gray (#F2F2F2) for backgrounds and subtle UI elements.
- Accent: Green (#5CB85C) for positive actions and success states.
- Clean and readable sans-serif font for all text elements.
- Use simple and clear icons from Heroicons or similar library.
- Use a clean and intuitive layout with clear sections for predictions, wallet, and results.
- Subtle animations for transitions and loading states to enhance user experience.

## Original User Request:
Develop a Telegram Mini App using Next.js 15 with a Monorepo architecture.
Project Requirements:

    Use NextUI or HeroUI (or both) for frontend components.

    Mandatory integration of official Telegram SDKs:

        @telegram-apps/sdk-react

        @telegram-apps/telegram-ui

        @tonconnect/ui-react if needed.

    Fully implement Telegram Mini App Authentication using initData.

    Follow Clean Architecture and Scalable Monorepo structure.

    Implement clean Navigation and Routing structure (well-separated pages).

    Create a unified StateView component to manage:

        Loading

        Error

        Empty

        Content states.

    Manage global state using Context API or Redux Toolkit (depending on complexity).

    Proper Loading and Error Handling in all pages and API calls.

    Prepare the project to match the WinCoins specification:

        Binary (Yes/No) prediction contests

        Wallet integration for Wincoin, Wincent, and Wingem

        Target KPIs for User Growth, Engagement, and Monetization.
  