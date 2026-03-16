const axios = require('axios');
const cheerio = require('cheerio');

const scrapeStudentTrends = async () => {
  try {
    const { data } = await axios.get('https://www.psychologytoday.com/us/blog/topic/education');
    const $ = cheerio.load(data);
    const insights = [];

    $('.node-type-article').each((i, el) => {
      insights.push({
        title: $(el).find('h2').text().trim(),
        summary: $(el).find('.excerpt').text().trim(),
        link: 'https://www.psychologytoday.com' + $(el).find('a').attr('href')
      });
    });

    return insights.slice(0, 5); // Return top 5 fresh insights
  } catch (error) {
    console.error("Scraping error:", error);
    return [];
  }
};

module.exports = scrapeStudentTrends;