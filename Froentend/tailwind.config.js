export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "rgb(var(--color-primary) / <alpha-value>)",
                primaryDark: "rgb(var(--color-primary-dark) / <alpha-value>)",
                bgLight: "rgb(var(--color-bg-light) / <alpha-value>)",
                card: "rgb(var(--color-card) / <alpha-value>)",
                borderColor: "rgb(var(--color-border) / <alpha-value>)",
                textMain: "rgb(var(--color-text) / <alpha-value>)",
            },
        },
    },
    plugins: [],
};