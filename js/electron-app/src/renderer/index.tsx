import ReactDOM from 'react-dom/client';
// TODO: The export should be aliased so that 'src' part is not needed
import Index from 'react-app/src'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Index />);

postMessage({ payload: 'removeLoading' }, '*');