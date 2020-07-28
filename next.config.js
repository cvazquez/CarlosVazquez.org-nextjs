module.exports = {
	env:	{
		global	: {
			title	: 'Adventures of Carlos',
			apiURL	: "http://" + (process.env.NODE_ENV === "development" ? "dev." : "") + "api.carlosvazquez.org"
		}
	}
};