# StudLeague 🎓🗳️

StudLeague is a voting system designed for the Ukrainian Student League. It provides a flexible sign-up process and incorporates two-factor authentication for enhanced security. The system allows real-time voting through websockets, providing detailed statistics for each voting session.

## Main Features 🚀

- 💪 Flexible sign-up process with two-factor authentication
- 📊 Real-time votings with websocket support
- 📈 Detailed statistics for each voting session

## Admin Capabilities 👑

- 👤 Manage user roles: Administrators can assign specific roles to users, granting them different privileges.
- ✅ User Activation: Admins have the ability to activate user accounts, ensuring that only approved users can participate.
- ❌ User Deletion: Admins can also delete user accounts if necessary.
- 🗳️ Voting Control: Admins with voting control rights can create and manage votings, including options for making them private (anonymous) or public (visible to all users). They can also close votings when necessary.
- 🌐 User Type-Based Votings: Admins can create votings exclusive to certain user types, such as associate members or full-fledged members of the USL.

## Regular User Functionalities 👤

Regular users have access to the following features:

- 🔒 Change password
- 📧 Update email address
- 🔐 Enable or disable two-factor authentication
- 🖼️ Change profile picture
- 🌗 Switch between dark and light themes

## Tech Stack 💻

The frontend of StudLeague is built using the following technologies:

- ⚛️ React.js: A JavaScript library for building user interfaces.
- 🔄 Redux: A predictable state container for JavaScript applications.
- 🎨 Material-UI: A popular React UI framework that follows the Material Design guidelines.

## Getting Started 🚀

### Prerequisites

Before running the StudLeague frontend, ensure that you have the following:

- Node.js installed on your machine.

### Installation

1. Clone this repository:
```bash
git clone https://github.com/treizeez/studleague.git
```
2. Change to the project directory:
```bash
cd studleague
```
3. Install the dependencies:
```bash
npm install
```
4. Start the development server:
```bash
npm start
```
5. Open your browser and visit `http://localhost:3000` to see StudLeague in action!
