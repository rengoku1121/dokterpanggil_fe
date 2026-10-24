/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './*.html',
        './layanan/**/*.html',
        './dokter/**/*.html',
        './dokter-spesialis/**/*.html',
        // Class names built at runtime (modals, doctor directory, FAQ toggles)
        './assets/js/**/*.js',
        './src/**/*.js',
        './tools/**/*.js'
    ],
    theme: {
        extend: {
            colors: {
                primary: '#D83030',
                'primary-light': '#E85555',
                'primary-dark': '#772017',
                accent: '#EA843F',
                cream: '#FFF9F5',
                'warm-white': '#FFFDFB',
                'warm-gray': '#F7F3F0',
                charcoal: '#2D2D2D',
                'soft-green': '#4CAF7D'
            }
        }
    },
    plugins: []
};
