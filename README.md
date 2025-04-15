# Toast.js Documentation

## Introduction

Toast.js is a lightweight, customizable JavaScript toast notification library. It provides an elegant way to display non-disruptive messages to users with flexible positioning, styling, and callback options.

## Installation

Include the Toast.js file in your project:

```html
<script src="path/to/toast.js"></script>
```

The library automatically initializes a global `Toast` object with default settings.

## Basic Usage

Display a toast notification with one of the four predefined types:

```javascript
// Success notification
Toast.success({
  title: 'Success!',
  message: 'Your changes have been saved'
});

// Error notification
Toast.error({
  title: 'Error',
  message: 'Unable to complete operation'
});

// Warning notification
Toast.warning({
  title: 'Warning',
  message: 'This action cannot be undone'
});

// Regular message notification
Toast.message({
  title: 'Information',
  message: 'Your session will expire in 5 minutes'
});
```

## Configuration

### Global Configuration

Configure toast defaults when initializing:

```javascript
const Toast = new Toaster({
  duration: 4000,      // Duration in milliseconds
  position: 'right',   // Horizontal position: 'left', 'right', 'center'
  align: 'top',        // Vertical position: 'top', 'bottom', 'center'
  onShow: null,        // Global callback when toast is shown
  onClose: null,       // Global callback when toast is closed
  onDismiss: null      // Global callback when toast is manually dismissed
});
```

### Per-toast Configuration

Configure individual toasts with the options object:

```javascript
Toast.success({
  title: 'Success',
  message: 'Operation completed',
  duration: 3000,                 // Overrides global duration
  position: 'center',             // Overrides global position
  align: 'bottom',                // Overrides global alignment
  colour: '#00C851',              // Custom color for left border
  onShow: () => console.log('Toast shown'),
  onClose: () => console.log('Toast closed'),
  onDismiss: () => console.log('Toast dismissed')
});
```

## API Reference

### Toaster Constructor

```javascript
const Toast = new Toaster(options);
```

#### Options

| Option     | Type       | Default   | Description                                      |
|------------|------------|-----------|--------------------------------------------------|
| `duration` | `number`   | `5000`    | Duration in milliseconds to display the toast    |
| `position` | `string`   | `'right'` | Horizontal position (`'left'`, `'right'`, `'center'`) |
| `align`    | `string`   | `'top'`   | Vertical position (`'top'`, `'bottom'`, `'center'`) |
| `colour`   | `string`   | `null`    | Default color for the left border                |
| `onShow`   | `function` | `null`    | Global callback when any toast is shown          |
| `onClose`  | `function` | `null`    | Global callback when any toast is closed         |
| `onDismiss`| `function` | `null`    | Global callback when any toast is dismissed manually |

### Toast Type Methods

Each method returns the toast element that was created.

#### success(options)

Displays a success toast with a green left border by default.

```javascript
Toast.success({
  title: 'Success',
  message: 'Operation completed'
  // ...other options
});
```

#### error(options)

Displays an error toast with a red left border by default.

```javascript
Toast.error({
  title: 'Error',
  message: 'Operation failed'
  // ...other options
});
```

#### warning(options)

Displays a warning toast with an orange left border by default.

```javascript
Toast.warning({
  title: 'Warning',
  message: 'Proceed with caution'
  // ...other options
});
```

#### message(options)

Displays an information toast with a blue left border by default.

```javascript
Toast.message({
  title: 'Information',
  message: 'Your session expires soon'
  // ...other options
});
```

#### show(options)

Base method that displays a toast with no predefined styling.

```javascript
Toast.show({
  title: 'Custom Toast',
  message: 'With custom options',
  colour: '#9933CC'
  // ...other options
});
```

### Toast Options

| Option     | Type       | Default   | Description                                   |
|------------|------------|-----------|-----------------------------------------------|
| `title`    | `string`   | `''`      | Toast title (displayed in bold)               |
| `message`  | `string`   | `''`      | Toast message content                         |
| `duration` | `number`   | `5000`    | Duration in milliseconds to show the toast    |
| `position` | `string`   | `'right'` | Horizontal position (`'left'`, `'right'`, `'center'`) |
| `align`    | `string`   | `'top'`   | Vertical position (`'top'`, `'bottom'`, `'center'`) |
| `colour`   | `string`   | `null`    | Colour for the left border (CSS color value)  |
| `onShow`   | `function` | `null`    | Callback when this toast is shown             |
| `onClose`  | `function` | `null`    | Callback when this toast is closed (for any reason) |
| `onDismiss`| `function` | `null`    | Callback when this toast is dismissed manually |

## Event Lifecycle

1. **Show**: Toast appears with a slide-in animation
   - `onShow` callback executes after animation completes

2. **Close**: Toast is removed after duration expires or when manually closed
   - `onClose` callback executes whenever toast is removed
   - `onDismiss` callback executes only when manually dismissed

## Advanced Usage

### Custom Positioning

Position toasts in any of nine different positions on the screen:

```javascript
// Top-right corner (default)
Toast.success({
  title: 'Success',
  position: 'right',
  align: 'top'
});

// Bottom-center
Toast.error({
  title: 'Error',
  position: 'center',
  align: 'bottom'
});

// Center of screen
Toast.warning({
  title: 'Warning',
  position: 'center',
  align: 'center'
});
```

### Custom Colors

Customize the left border color with any valid CSS color value:

```javascript
// Using named colors
Toast.message({
  title: 'Purple Message',
  colour: 'purple'
});

// Using hex values
Toast.message({
  title: 'Custom Color',
  colour: '#8E44AD'
});

// Using RGB/RGBA
Toast.message({
  title: 'Semi-transparent',
  colour: 'rgba(52, 152, 219, 0.8)'
});
```

### Using Callbacks

Track toast lifecycle events with callbacks:

```javascript
Toast.success({
  title: 'Success',
  message: 'Item saved successfully',
  onShow: () => {
    console.log('Toast shown to user');
    // Perform actions when toast appears
  },
  onClose: () => {
    console.log('Toast was closed');
    // Perform cleanup or follow-up actions
  },
  onDismiss: () => {
    console.log('User dismissed the toast');
    // React to user manually closing the toast
  }
});
```

### Sequential Toasts

Show multiple toasts in sequence with callbacks:

```javascript
Toast.message({
  title: 'Step 1',
  message: 'Starting process...',
  onClose: () => {
    Toast.message({
      title: 'Step 2',
      message: 'Processing data...',
      onClose: () => {
        Toast.success({
          title: 'Step 3',
          message: 'Process complete!'
        });
      }
    });
  }
});
```

## Browser Compatibility

Toast.js works in all modern browsers (Chrome, Firefox, Safari, Edge) that support ES6 features.

## License

This library is released under the MIT License.
