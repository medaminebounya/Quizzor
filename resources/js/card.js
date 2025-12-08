class QuizCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['title', 'description', 'icon', 'link'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const title = this.getAttribute('title') || '';
        const description = this.getAttribute('description') || '';
        const icon = this.getAttribute('icon') || 'help-circle';
        const link = this.getAttribute('link') || '#';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-bottom: 1rem;
                }
                .card {
                    background: white;
                    border-radius: 1rem;
                    padding: 1.5rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }
                .card:hover {
                    transform: translateY(-0.5rem);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                }
                .icon-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 4rem;
                    height: 4rem;
                    margin: 0 auto 1rem;
                    border-radius: 50%;
                    background: #EFF6FF;
                    color: #3B82F6;
                }
                .title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    text-align: center;
                    margin-bottom: 0.5rem;
                    color: #1F2937;
                }
                .description {
                    text-align: center;
                    color: #6B7280;
                    font-size: 0.875rem;
                    line-height: 1.5;
                }
                a {
                    text-decoration: none;
                    color: inherit;
                }
            </style>
            <a href="${link}">
                <div class="card">
                    <div class="icon-container">
                        <i data-feather="${icon}"></i>
                    </div>
                    <h3 class="title">${title}</h3>
                    <p class="description">${description}</p>
                </div>
            </a>
        `;
        
        // Initialize feather icons after rendering
        if (window.feather) {
            window.feather.replace({ class: 'feather', 'stroke-width': 2 });
        }
    }
}

customElements.define('quiz-card', QuizCard);