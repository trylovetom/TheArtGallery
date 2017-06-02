# TheArtGallery
NTUST ET6401701 Data Base Design 陳郁堂 Yie-Tarng Chen

## General Description
The Art Gallery accepts works by libing contemporary artists to be sold on a commion basis. It currently offers work from about 1000 artists and sells approximately 1000 pieces each year. The average selling price is several thousand dollars. There are about 5000 customers who have purchased pieces from the gallery. The sales staff consists of gallery owner, Alan Hughes, and four sales associates. Their activities are supported by an office staff of two people.

## Basic Operations
When an artist wishes to sell one or more works, he or she contacts the gallery. Alan Hughes, the owner, vists the artist's studio and selects the works to be sold through the gallery, working with the artist to set an asking price for each piece. The sales staff attempt to sell the work at that price, but customers may negortiate with salespeople, so that the actual selling price may be below the asking price. In that case, the final selling price must be approved by the artist. The commission charged by the gallery is 10 percent of the selling price. The gallery splits the commission with the salesperson who makes the sale. Any salesperson can sell any work in the gallery. However, customers work with a single salesperson when they buy each piece, so that the salesperson's portion of the commission for a single piece goes to only one employee.

The gallery promotes the works by holding showings fearuting various pieces. The showings are advertised in newspapers and other media, and past customers are sent personal invitations. A showing provide an opportunity for the public to see the pieces an to meet the artist or artists whose works are featured. Works of art that have been featured at a showing remain on display until they are returned to the artist. Apiece may be purchased at the showing or any time afterward. Occasionally, a work may be purchased form the fallery prior to the show and included in the exhibit to provide the public with a better view of the artist's work.

## Information Needs
At present, all data relating to artists, unsold works, sales, and customers are kept in separate files. The files have th folloing data:

* Unsold_Work: Title, Artist, Type, Medium, Style, Size, Asking_price, Date_Of_Show
* Artist: Name, Address, Phone, SocSecNo, UsaualType, UsualMedium, Usual-Style, Sales_Last_Year, Sales_Year_To_Date
* Sale: Title, Artist, Cust_Name, Cust_Add, Date_Sold, Salesperson, Selling_Price
* Customer: Cust_Name, Cust_Add, Cust_Phone, Amt_Bought_Last)Year, Amt_bought_Year_To_Date

The Unsold_Work file keeps track of the works currently on exhibit, and is used by salespeople. Each work must have a title, which is unique to the artist but may not br totally unique to the gallery. For example, may artists may have works such as "Composition Number 5," but no  artist has two works with that title. Each work is by a single artist. The type refers to the type of work, which may be painting, sculpture, collage, and so on. The medium refers to the materials used in the work as oil, watercolor, marble, mixed, and so on. A piece using more than one medium is categorized as mixed. The tyle means the style of the work, thich may be contemporary impressionist, folk, and so on. The size is expressed in units appropriate for the work; for example, for a painting, the size would be the number of inches in height and width. The Artist file isused to keep track of artists and to report to the Internal Revenue Service the amount of sales for each each artist. Sales_Last_Year is a dollar figure giving the total amount of sales for that artist last year, and Sales_Year_To_Date gives the total amount of sales so for sales this year. Information is kept about the usual type, mdium, and style of each artist, where these works hace the same meanings as in the Unsold_Work file. The Customer file keeps track of customers who hace made puchases, and includes information about the dollar amount of their purches last year and so far this year. When a purchase is made, a receipt is made out for the customer, a payment check and stub are made out for the artist, the commission is the customer, a payment check and stub are made out for the artist, the commission is allocated between the gallery and the salesperson, and all files are updated individually.

Alan realizes that a database would provide more information from the stored data than is available now. He also wants to capture data note presently stored. In addition, he foreses that the gallery may begin to accept works owned by collectors as well as works directly from artists. Your database design should in clude the possibility that the owner is not the artist, sroting both artist data and owner data. Hewould like to hire you as a consultant to design and implement a database that the office stagg can maintain. The database should be capable of producing the following reports:

1. Active Aritist: Lists data about artist, including Artist's Namem Address, Telephone, Usual Type, Usual Medium, Usual Style, Last Year's Sales, This Year's Sales
2. Collector Owners: Lists data about each owner, including Ower's Name, Address, Telephone, Last Year's Sales, This Year's Sales
3. Works for Sale: Lists data about each work, including Title, Artist, Type, Medium, Style, Woner's Name, Asking Price, Date of Showing
4. Sales This Week: Lists data about all sales of works during the current week. Divided by salesperson, it shows Salesperson Name. For each work sold by that person, it shows Selling Price, Title, Artist, Owner, Customer Name, Customer Address, Date of Sale
5. Customers: In alphabetical order by name, shows Cusomer Name, Address, Telephone, Dollar Amount of Last Year's Purchases, Dollar Amount of This Year's Purchases

It should print receipts such as the following:

6. Cusomer Receipt: Date of Sale, Name, Address, title, Artist, Type, Medium, Style, Size, Selling Price, Salesperson

A payment stub for the artist or owner should be printed:

7. Payment: Owner Name, Owner Address, Artist Name, Owner Social Security Number, Title, Type, Medium, Style, Size, Salesperson, Selling Price, Amount Remitted

Alan Would like to target potential customers as well as present ones, by making lists of all those who attend showings or whose names are gathered in other ways. For each present and potential customer, he would like to keep the identifying data now in the customer file, and add information about the customer's preferences, such as the name of a preferred artist, type, medium, and style. He hopes to increase sales and hold down costs by using this information to make up targeted invitation lists for showings of works that match customer preferences. For example, he would like to be able to get a report such as the following:

8. Pregerred Customer Report: Artist, Title, Type, Medium, Style. for each person who might be interested in the work, it lists Cusomer Name, Customer Address, Pregerred Artist, Pregerred Type, Pregerred Media, Pregerred Style

Here, the values for artist, type, medium, and style of the piece may match some of the values of the customer pregerences, and the gallery can send private invitations to those customers.

Alan would also like to be able to combine artist and works data, makeing lists of all the works, whether sold or unsold, of a paritcular artist, in a report such as the following:

9. Artist Report: Lists Artist Name, Artist Address. For each work by that artist, it shows Title, Type, Medium, Style, Asking Price, Selling Price, Date Sold

If a work has been sold, there will be values for Selling Price and Date Sold. Unsold works will have blanks in thses areas.

He would like a similar report for owners and their works, as follows:

10. Owner's Report: Shows Owner Name, Owner Address. For each work owned, it lists Artist Name, Title, Type, Medium, Style, Asking Price, Selling Price, Date Sold

Alan might also like reports on the sales of individual salespeople for the current quarter or the past year:

11. Salesperson Performance Report: Lists Report Starting Date, Report Ending Date, Salesperon, Total Sales, This Period. For each work sold by that person, it shows Title, Artist, Saking Price, Selling Price

This report would be benerated for a period starting with whatever date is selected (e.g., January first of the current year) and ending with another selected date (e.g., today's date). It provides an individual listing of each of the works sold by that person during the period, as well as his or her total sales for the period chosen.

There are several other reports that could be helpful, and several routine transactions that are needed. You sould show these, and give layouts of the ones listed above, in Step 1.1. In step 1.2 you sould write assumptions that summarize the operations of the gallery as described here or as described by someone you interviewed.
