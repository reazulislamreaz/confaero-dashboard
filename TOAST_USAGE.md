# Global Toast Configuration

The `react-hot-toast` library has been globally configured in this project. Here's how to use it:

## Method 1: Using the global toast function (available everywhere)

Since we've attached the toast to the window object, you can use it anywhere in your application:

```javascript
// In any component or file
window.toast.success('Success message!');
window.toast.error('Error message!');
window.toast('Info message!');
```

## Method 2: Using the custom hook

Import and use the `useToast` hook in your components:

```javascript
import { useToast } from '../hooks/useToast';

const MyComponent = () => {
  const toast = useToast();

  const handleClick = () => {
    toast.success('Success message!');
  };

  return (
    <button onClick={handleClick}>Show Toast</button>
  );
};
```

## Method 3: Importing toast directly

You can also import toast directly from the hook file:

```javascript
import toast from '../hooks/useToast';

const MyComponent = () => {
  const handleClick = () => {
    toast.success('Success message!');
  };

  return (
    <button onClick={handleClick}>Show Toast</button>
  );
};
```

## Available Methods

- `toast.success(message)` - Shows a success toast
- `toast.error(message)` - Shows an error toast
- `toast.loading(message)` - Shows a loading toast
- `toast(message)` - Shows a default toast
- `toast.dismiss(id?)` - Dismisses a specific toast or all toasts

## Configuration

The toasts are configured with:
- Position: top-right
- Duration: 4000ms (4 seconds)
- Success background: #10b981 (green)
- Error background: #ef4444 (red)
- Default background: #363636 (dark gray)

The Toaster component is rendered once in the main application wrapper, making it available throughout the entire app.