# Company CRUD Application

A production-ready web application that implements full Create, Read, Update, and Delete (CRUD) operations for a "Company" entity with nested employee management.

## Features

- **Company Management**: Full CRUD operations for companies
- **Employee Management**: Add, edit, and manage employee information within companies
- **Skills & Education Tracking**: Track employee skills and education history
- **Search & Pagination**: Search companies and paginate through results
- **Responsive Design**: Works on desktop and mobile devices
- **Form Validation**: Comprehensive client and server-side validation
- **Toast Notifications**: User-friendly feedback for all operations

## Tech Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Headless UI** for accessible components
- **React Hook Form** + **Zod** for form handling and validation
- **React Query** for data fetching and caching
- **React Hot Toast** for notifications

### Backend
- **Express.js** REST API
- **Prisma** ORM with SQLite database
- **Zod** for request validation
- **CORS** and **Helmet** for security

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd company-crud-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"
   
   # API
   API_PORT=3001
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # Seed the database with sample data
   npm run db:seed
   ```

5. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the frontend (Next.js) and backend (Express) servers concurrently:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run frontend:dev` - Start only the frontend development server
- `npm run backend:dev` - Start only the backend development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run preview` - Build and start the production server
- `npm run db:seed` - Seed the database with sample data
- `npm run db:reset` - Reset the database and reseed
- `npm run lint` - Run ESLint

## API Endpoints

### Companies
- `GET /api/companies` - List companies with search and pagination
- `GET /api/companies/:id` - Get a specific company
- `POST /api/companies` - Create a new company
- `PUT /api/companies/:id` - Update a company
- `DELETE /api/companies/:id` - Delete a company

### Query Parameters for GET /api/companies
- `search` - Search by company name or email
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

## Data Models

### Company
- `id`: string (UUID)
- `companyName`: string (required, max 50 chars)
- `address`: string (optional)
- `email`: string (required, email format, max 100 chars)
- `phoneNumber`: string (required, max 15 chars)
- `createdAt`: Date
- `empInfo`: Employee[]

### Employee
- `id`: string (UUID)
- `companyId`: string
- `empName`: string (required, max 25 chars)
- `designation`: enum (Developer, Manager, System Admin, Team Lead, PM)
- `joinDate`: Date (required, must be in the past)
- `email`: string (required, email format, max 100 chars)
- `phoneNumber`: string (required, max 15 chars)
- `skillInfo`: Skill[]
- `educationInfo`: Education[]

### Skill
- `id`: string (UUID)
- `employeeId`: string
- `skillName`: enum (from predefined list)
- `skillRating`: integer (1-5)

### Education
- `id`: string (UUID)
- `employeeId`: string
- `instituteName`: string (required, max 50 chars)
- `courseName`: string (required, max 25 chars)
- `completedYear`: string (format: "Mon YYYY")

## Form Validation

The application includes comprehensive validation:

### Company Basic Info
- Company name: required, max 50 characters
- Email: required, valid email format, max 100 characters
- Phone number: required, max 15 characters
- Address: optional

### Employee Info
- Employee name: required, max 25 characters
- Designation: required, from predefined options
- Join date: required, must be in the past
- Email: required, valid email format, max 100 characters
- Phone number: required, max 15 characters
- Skills: optional array with skill name and rating (1-5)
- Education: optional array with institute, course, and completion year

## UI Components

### Navigation
- Responsive sidebar with "Company List" and "New Company" links
- Active state highlighting
- Mobile-friendly collapsible menu

### Company List
- Searchable table with company information
- Pagination controls
- Edit and delete actions with confirmation
- Empty and error states

### Company Form
- Tabbed interface for "Company Basic Info" and "Employee Info"
- Dynamic employee addition/removal
- Dynamic skill and education management
- Real-time validation feedback
- Accessible form controls

## Error Handling

- Client-side validation with immediate feedback
- Server-side validation with detailed error messages
- Network error handling with retry options
- User-friendly error messages and loading states

## Testing

The application includes basic unit tests for:
- Zod validation schemas
- Date validation logic
- Form field validation

Run tests with:
```bash
npm test
```

## Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm run start
   ```

3. **Environment variables**
   Make sure to set the appropriate environment variables for production:
   - `DATABASE_URL` - Production database connection string
   - `API_PORT` - Port for the API server
   - `NEXT_PUBLIC_API_URL` - Public URL for the API

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.