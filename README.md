# TheArtGallery
NTUST ET6401701 Data Base Design 陳郁堂 Yie-Tarng Chen

## 自評表
1. Basic Database CRUD
2. Continuous Integration
3. Build Pipelines
4. Continuous Deployment(AWS Auto Deploy Script)
5. Follow The Github Flow: https://github.com/trylovetom/TheArtGallery: http://env-development.mkihqp7kgc.us-west-2.elasticbeanstalk.com

## ER Diagram
![](https://i.imgur.com/xIr2rYv.png)

## Relational Schema
![](https://i.imgur.com/OkFZPHF.png)

## SQL Design
```
CREATE TABLE ARTIST (
  Address VARCHAR(128),
  UsualStyle VARCHAR(20),
  Phone VARCHAR(20),
  SocialSecurityNumber VARCHAR(20),
  UsualType VARCHAR(20),
  SalesLastYear VARCHAR(32),
  SalesYearToDate VARCHAR(32),
  ArtistId VARCHAR(32),
  FirstName VARCHAR(20),
  LastName VARCHAR(20),
  UsualMedium VARCHAR(20),
  PRIMARY KEY (ArtistId)
);

CREATE TABLE WORK (
  Title VARCHAR(20),
  Style VARCHAR(20),
  Size VARCHAR(20),
  Type VARCHAR(20),
  AskingPrice VARCHAR(32),
  Medium VARCHAR(20),
  DateOfShow DATE,
  WorkId VARCHAR(32),
  ArtistId VARCHAR(32),
  PRIMARY KEY (WorkId),
  FOREIGN KEY (ArtistId) REFERENCES ARTIST(ArtistId)
);

CREATE TABLE CUSTOMER (
  CustomerId VARCHAR(32),
  FirstName VARCHAR(20),
  Address VARCHAR(128),
  Phone VARCHAR(20),
  AmountBoughtLastYear VARCHAR(32),
  AmountBoughtYearToDate VARCHAR(32),
  LastName VARCHAR(20),
  PRIMARY KEY (CustomerId)
);

CREATE TABLE SALE (
  DateSold DATE,
  Salesperson VARCHAR(20),
  SellingPrice VARCHAR(32),
  SaleId VARCHAR(32),
  CustomerId VARCHAR(32),
  WorkId VARCHAR(32),
  PRIMARY KEY (SaleId),
  FOREIGN KEY (CustomerId) REFERENCES CUSTOMER(CustomerId),
  FOREIGN KEY (WorkId) REFERENCES WORK(WorkId)
);
```

## API End Point

1. Artist
    <table>
            <tr><td>Parameter</td><td>Type</td></tr>
            <tr><td>ArtistId</td><td>String</td></tr>
            <tr><td>FirstName</td><td>String</td></tr>
            <tr><td>LastName</td><td>String</td></tr>
            <tr><td>Phone</td><td>String</td></tr>
            <tr><td>Address</td><td>String</td></tr>
            <tr><td>SocialSecurityNumber</td><td>String</td></tr>
            <tr><td>UsualStyle</td><td>String</td></tr>
            <tr><td>UsualType</td><td>String</td></tr>
            <tr><td>UsualMedium</td><td>String</td></tr>
            <tr><td>SalesLastYear</td><td>String</td></tr>
            <tr><td>SalesYearToDate</td><td>String</td></tr>
        </table>
        
    - `POST /artist` create the new artist
    - `GET /artist/:id` get the artist by id, without id you can get the all list
    - `UPDATE /artist/:id` update the artist by id
    - `DELETE /artist/:id` delete the artist by id
        
2. Work
    <table>
        <tr><td>ArtistId</td><td>String</td></tr>
        <tr><td>Parameter</td><td>Type</td></tr>
        <tr><td>Title</td><td>String</td></tr>
        <tr><td>Style</td><td>String</td></tr>
        <tr><td>Size</td><td>String</td></tr>
        <tr><td>Type</td><td>String</td></tr>
        <tr><td>AskingPrice</td><td>String</td></tr>
        <tr><td>Medium</td><td>String</td></tr>
        <tr><td>DateOfShow</td><td>DATE</td></tr>
    </table>
    
    - `POST /work` create the new work
    - `GET /work:id` get the work by id, without id you can get the all list
    - `UPDATE /work:id` update the work by id
    - `DELETE /work:id` delete the work by id
3. Customer
    <table>
        <tr><td>Parameter</td><td>Type</td></tr>
        <tr><td>CustomerId</td><td>String</td></tr>
        <tr><td>FirstName</td><td>String</td></tr>
        <tr><td>LastName</td><td>String</td></tr>
        <tr><td>Phone</td><td>String</td></tr>
        <tr><td>Address</td><td>String</td></tr>
        <tr><td>AmountBoughtLastYear</td><td>String</td></tr>
        <tr><td>AmountBoughtYearToDate</td><td>String</td></tr>
    </table>
    
    - `POST /customer` create the new customer
    - `GET /customer/:id` get the customer by id, without id you can get the all list
    - `UPDATE /customer/:id` update the customer by id
    - `DELETE /customer/:id` delete the customer by id
4. Sale
    <table>
        <tr><td>Parameter</td><td>Type</td></tr>
        <tr><td>DateSold</td><td>Date</td></tr>
        <tr><td>Salesperson</td><td>String</td></tr>
        <tr><td>SellingPrice</td><td>String</td></tr>
        <tr><td>Address</td><td>String</td></tr>
        <tr><td>SaleId</td><td>String</td></tr>
        <tr><td>CustomerId</td><td>String</td></tr>
        <tr><td>WorkId</td><td>String</td></tr>
    </table>
    
    - `POST /sale` create the new sale
    - `GET /sale/:id` get the sale by id, without id you can get the all list
    - `UPDATE sale/:id` update the sale by id
    - `DELETE sale/:id` delete the sale by id

## General Description
The Art Gallery accepts works by living contemporary artists to be sold on a commission basis. It currently offers work from about 1000 artists and sells approximately 1000 pieces each year. The average selling price is several thousand dollars. There are about 5000 customers who have purchased pieces from the gallery. The sales staff consists of gallery owner, Alan Hughes, and four sales associates. Their activities are supported by an office staff of two people.

## Basic Operations
When an artist wishes to sell one or more works, he or she contacts the gallery. Alan Hughes, the owner, visits the artist's studio and selects the works to be sold through the gallery, working with the artist to set an asking price for each piece. The sales staff attempt to sell the work at that price, but customers may negotiate with salespeople, so that the actual selling price may be below the asking price. In that case, the final selling price must be approved by the artist. The commission charged by the gallery is 10 percent of the selling price. The gallery splits the commission with the salesperson who makes the sale. Any salesperson can sell any work in the gallery. However, customers work with a single salesperson when they buy each piece, so that the salesperson's portion of the commission for a single piece goes to only one employee.

The gallery promotes the works by holding showings featuring various pieces. The showings are advertised in newspapers and other media, and past customers are sent personal invitations. A showing provide an opportunity for the public to see the pieces an to meet the artist or artists whose works are featured. Works of art that have been featured at a showing remain on display until they are returned to the artist. Apiece may be purchased at the showing or any time afterward. Occasionally, a work may be purchased form the gallery prior to the show and included in the exhibit to provide the public with a better view of the artist's work.

## Information Needs
At present, all data relating to artists, unsold works, sales, and customers are kept in separate files. The files have th following data:

* Unsold\_Work: Title, Artist, Type, Medium, Style, Size, Asking\_price, Date\_Of\_Show
* Artist: Name, Address, Phone, SocSecNo, UsaualType, UsualMedium, UsualStyle, Sales\_Last\_Year, Sales\_Year\_To\_Date
* Sale: Title, Artist, Cust\_Name, Cust\_Add, Date\_Sold, Salesperson, Selling\_Price
* Customer: Cust\_Name, Cust\_Add, Cust\_Phone, Amt\_Bought\_Last\_Year, Amt\_bought\_Year\_To\_Date

The Unsold\_Work file keeps track of the works currently on exhibit, and is used by salespeople. Each work must have a title, which is unique to the artist but may not be totally unique to the gallery. For example, may artists may have works such as "Composition Number 5," but no artist has two works with that title. Each work is by a single artist. The type refers to the type of work, which may be painting, sculpture, collage, and so on. The medium refers to the materials used in the work as oil, watercolor, marble, mixed, and so on. A piece using more than one medium is categorized as mixed. The style means the style of the work, which may be contemporary impressionist, folk, and so on. The size is expressed in units appropriate for the work; for example, for a painting, the size would be the number of inches in height and width. The Artist file is used to keep track of artists and to report to the Internal Revenue Service the amount of sales for each each artist. Sales\_Last\_Year is a dollar figure giving the total amount of sales for that artist last year, and Sales\_Year\_To\_Date gives the total amount of sales so for sales this year. Information is kept about the usual type, mdium, and style of each artist, where these works have the same meanings as in the Unsold_Work file. The Customer file keeps track of customers who have made purchases, and includes information about the dollar amount of their purchase last year and so far this year. When a purchase is made, a receipt is made out for the customer, a payment check and stub are made out for the artist, the commission is the customer, a payment check and stub are made out for the artist, the commission is allocated between the gallery and the salesperson, and all files are updated individually.

Alan realizes that a database would provide more information from the stored data than is available now. He also wants to capture data note presently stored. In addition, he foresees that the gallery may begin to accept works owned by collectors as well as works directly from artists. Your database design should in clude the possibility that the owner is not the artist, sroting both artist data and owner data. Hewould like to hire you as a consultant to design and implement a database that the office staff can maintain. The database should be capable of producing the following reports:

1. Active Artist: Lists data about each artist, including Artist's Name Address, Telephone, Usual Type, Usual Medium, Usual Style, Last Year's Sales, This Year's Sales
2. Collector Owners: Lists data about each owner, including Ower's Name, Address, Telephone, Last Year's Sales, This Year's Sales
3. Works for Sale: Lists data about each work, including Title, Artist, Type, Medium, Style, Owner's Name, Asking Price, Date of Showing
4. Sales This Week: Lists data about all sales of works during the current week. Divided by salesperson, it shows Salesperson Name. For each work sold by that person, it shows Selling Price, Title, Artist, Owner, Customer Name, Customer Address, Date of Sale
5. Customers: In alphabetical order by name, shows Customer Name, Address, Telephone, Dollar Amount of Last Year's Purchases, Dollar Amount of This Year's Purchases

It should print receipts such as the following:

6. Customer Receipt: Date of Sale, Name, Address, title, Artist, Type, Medium, Style, Size, Selling Price, Salesperson

A payment stub for the artist or owner should be printed:

7. Payment: Owner Name, Owner Address, Artist Name, Owner Social Security Number, Title, Type, Medium, Style, Size, Salesperson, Selling Price, Amount Remitted

Alan Would like to target potential customers as well as present ones, by making lists of all those who attend showings or whose names are gathered in other ways. For each present and potential customer, he would like to keep the identifying data now in the customer file, and add information about the customer's preferences, such as the name of a preferred artist, type, medium, and style. He hopes to increase sales and hold down costs by using this information to make up targeted invitation lists for showings of works that match customer preferences. For example, he would like to be able to get a report such as the following:

8. Preferred Customer Report: Artist, Title, Type, Medium, Style. for each person who might be interested in the work, it lists Customer Name, Customer Address, Preferred Artist, Preferred Type, Preferred Media, Preferred Style

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