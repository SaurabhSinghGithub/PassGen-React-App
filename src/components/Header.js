import { useState, useCallback, useEffect, useRef } from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold">Password Generator</h1>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} PassGen</p>
      </div>
    </footer>
  );
};

const Header = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*-_+=[]{}~`';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    document.execCommand('copy');
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-8 flex-grow">
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform">
          <div className="text-center text-2xl font-semibold mb-4">Password Generator</div>
          <div className="mb-4">
            <input
              type="text"
              value={password}
              placeholder="Password"
              readOnly
              ref={passwordRef}
              className="w-full border p-2 rounded focus:outline-none"
            />
            <button onClick={copyPasswordToClipboard} className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none">
              Copy
            </button>
          </div>
          <div>
            <div className="mb-4">
              <label htmlFor="length" className="block text-sm font-medium text-gray-600">Password Length</label>
              <input
                type="range"
                id="length"
                min={6}
                max={100}
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
                className="w-full focus:outline-none"
              />
              <div className="text-right">{length}</div>
            </div>
            <div className="mb-2">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
                className="mr-2 text-blue-500"
              />
              <label htmlFor="numberInput" className="text-gray-700">Include Numbers</label>
            </div>
            <div>
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
                className="mr-2 text-blue-500"
              />
              <label htmlFor="characterInput" className="text-gray-700">Include Special Characters</label>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Header;
