import { useState } from 'react';
import SignUpPage from './pages/SignUpPage';
import { SignInPage } from './pages/SignInPage';

function App() {
    const [page, setPage] = useState('signup');

    if (page === 'signin') {
        return <SignInPage onNavigateToRegister={() => setPage('signup')} />;
    }

    return <SignUpPage onNavigateToSignIn={() => setPage('signin')} />;
}

export default App;
