src/
├── components/
│   ├── ui/           # UI Components
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Modal/
│   ├── features/     # Feature Components
│   │   ├── auth/
│   │   ├── products/
│   │   └── cart/
│   └── pages/        # Page Components
│       ├── HomePage/
│       ├── ProductPage/
│       └── CheckoutPage/

eg.SigninForm compoent is page compinent.
It is a page and initial fetching or adding analytics etc logic go inside here.
Feature componet handle the business logic like validation and handleSUbmit function
Ui compoent is only responsible for displaying the form
