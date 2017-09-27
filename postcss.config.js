module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                "last 1 Chrome versions",
                "last 1 Edge versions",
                "last 1 Firefox versions",
                "last 1 IE version",
                "last 1 iOS versions",
                "last 1 Opera versions",
                "last 1 Safari versions",
                "not ie <= 10",
                "not op_mini all" //opera mini
            ]
        })
    ]
};
