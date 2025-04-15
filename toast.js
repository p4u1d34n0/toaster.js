/**
 * Toaster - A lightweight toast notification library
 */
class Toaster {
    constructor(options = {}) {
        this.defaultOptions = {
            title: '',
            message: '',
            duration: options.duration || 5000,
            position: options.position || 'right',
            align: options.align || 'top',
            colour: null,
            onShow: null,
            onClose: null,
            onDismiss: null
        };

        // Create container for toasts if it doesn't exist
        this.container = document.getElementById('toast-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.style.cssText = `
          position: fixed;
          z-index: 9999;
          pointer-events: none;
        `;
            document.body.appendChild(this.container);
        }

        this.setContainerPosition();
    }

    setContainerPosition() {
        const position = this.defaultOptions.position;
        const align = this.defaultOptions.align;

        // Reset position styles
        this.container.style.top = 'auto';
        this.container.style.right = 'auto';
        this.container.style.bottom = 'auto';
        this.container.style.left = 'auto';

        // Set position based on align and position
        if (align === 'top') {
            this.container.style.top = '20px';
        } else if (align === 'bottom') {
            this.container.style.bottom = '20px';
        } else if (align === 'center') {
            this.container.style.top = '50%';
            this.container.style.transform = 'translateY(-50%)';
        }

        if (position === 'right') {
            this.container.style.right = '20px';
        } else if (position === 'left') {
            this.container.style.left = '20px';
        } else if (position === 'center') {
            this.container.style.left = '50%';
            this.container.style.transform = (align === 'center')
                ? 'translate(-50%, -50%)'
                : 'translateX(-50%)';
        }
    }

    show(options = {}) {
        const mergedOptions = { ...this.defaultOptions, ...options };

        // Update container position if different from default
        if (options.position || options.align) {
            const currentPosition = this.container.style.right ? 'right' : 'left';
            const currentAlign = this.container.style.top ? 'top' : 'bottom';

            if (options.position !== currentPosition || options.align !== currentAlign) {
                this.defaultOptions.position = options.position || this.defaultOptions.position;
                this.defaultOptions.align = options.align || this.defaultOptions.align;
                this.setContainerPosition();
            }
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.style.cssText = `
        pointer-events: auto;
        margin-bottom: 10px;
        padding: 15px 20px 15px 15px;
        width: 300px;
        background-color: white;
        color: #333;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: flex-start;
        overflow: hidden;
        transform: translateX(${mergedOptions.position === 'right' ? '120%' : '-120%'});
        transition: transform 0.3s ease-out;
        position: relative;
        border-left: 5px solid ${mergedOptions.colour || '#333'};
      `;

        // Toast content
        const contentDiv = document.createElement('div');
        contentDiv.style.cssText = `flex: 1;`;

        const titleElement = document.createElement('h4');
        titleElement.textContent = mergedOptions.title;
        titleElement.style.cssText = `
        margin: 0 0 5px 0;
        font-weight: bold;
        font-size: 16px;
      `;

        const messageElement = document.createElement('p');
        messageElement.textContent = mergedOptions.message || '';
        messageElement.style.cssText = `
        margin: 0;
        font-size: 14px;
      `;

        contentDiv.appendChild(titleElement);
        if (mergedOptions.message) contentDiv.appendChild(messageElement);
        toast.appendChild(contentDiv);

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
        background: transparent;
        border: none;
        font-size: 20px;
        cursor: pointer;
        margin-left: 10px;
        color: #999;
        line-height: 1;
        padding: 0 5px;
      `;

        closeBtn.addEventListener('click', () => {
            if (typeof mergedOptions.onDismiss === 'function') {
                mergedOptions.onDismiss();
            }
            this.removeToast(toast);
        });

        toast.appendChild(closeBtn);

        // Store callbacks for later use
        toast._onClose = mergedOptions.onClose;
        toast._onDismiss = mergedOptions.onDismiss;

        // Add to container
        this.container.appendChild(toast);

        // Trigger animation
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';

            // Execute onShow function if provided
            if (typeof mergedOptions.onShow === 'function') {
                mergedOptions.onShow();
            }
        }, 10);

        // Set timeout for auto removal
        const duration = mergedOptions.duration || this.defaultOptions.duration;
        const timeoutId = setTimeout(() => {
            this.removeToast(toast);
        }, duration);

        // Store timeout ID on toast element
        toast._timeoutId = timeoutId;

        return toast;
    }

    removeToast(toast) {
        // Clear the auto-remove timeout
        clearTimeout(toast._timeoutId);

        // Animate out
        toast.style.transform = `translateX(${this.defaultOptions.position === 'right' ? '120%' : '-120%'})`;

        // Execute onClose function if provided
        if (typeof toast._onClose === 'function') {
            toast._onClose();
        }

        // Remove from DOM after animation
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    success(options = {}) {
        return this.show({ ...options, colour: options.colour || '#4CAF50' });
    }

    error(options = {}) {
        return this.show({ ...options, colour: options.colour || '#F44336' });
    }

    warning(options = {}) {
        return this.show({ ...options, colour: options.colour || '#FF9800' });
    }

    message(options = {}) {
        return this.show({ ...options, colour: options.colour || '#2196F3' });
    }
}

// Initialize with default settings
window.Toast = new Toaster();

// Add CSS to document
const style = document.createElement('style');
style.textContent = `
    #toast-container {
      max-width: 100%;
      max-height: 100%;
      overflow: hidden;
    }
  `;
document.head.appendChild(style);
