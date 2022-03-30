module.exports = {
    content: ['./index.html', './src/**/*.{tsx,ts,js,jsx}'],
    theme: {
        extend: {
            colors: {
                url: '#0047cc',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
};
