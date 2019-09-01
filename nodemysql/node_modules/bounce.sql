CREATE DATABASE Bounce;
USE Bounce;

CREATE TABLE Profile (
    userID INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    gender ENUM('Male', 'Female', 'Other'),
    phoneNumber VARCHAR(10),
    emailAddress VARCHAR(255),
    lastLogin TIMESTAMP,
    PRIMARY KEY (userID)
);

CREATE TABLE Contacts (
    contactID INT NOT NULL AUTO_INCREMENT,
    userID INT,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    gender ENUM('Male', 'Female', 'Other'),
    locationMet VARCHAR(255),
    dateMet DATE NOT NULL,
    prepStatus TINYINT,
    phoneNumber VARCHAR(10),
    emailAddress VARCHAR(255),
    notes VARCHAR(255),
    rating INT,
    PRIMARY KEY (contactID),
    INDEX (userID),

    FOREIGN KEY (userID)
        REFERENCES profile(userID)
);

CREATE TABLE SexualActs (
    actID INT AUTO_INCREMENT,
    actName VARCHAR(255),
    PRIMARY KEY (actID)
);

CREATE TABLE Protection (
    protectionID INT AUTO_INCREMENT,
    protectionName VARCHAR(255),
    PRIMARY KEY (protectionID)
);

CREATE TABLE STI (
    stiName VARCHAR(255) NOT NULL,
    tracePeriod INT,
    abstinancePeriod INT,
    PRIMARY KEY (stiName)
);

CREATE TABLE PillSchedule (
    tabletID INT AUTO_INCREMENT,
    doseSchedule INT,
    courseDuration INT,
    PRIMARY KEY (tabletID)  
);

CREATE TABLE HealthMessages (
    messageID INT,
    healthTip VARCHAR(255),
    PRIMARY KEY (messageID)
);

CREATE TABLE alertMessages (
    alertID INT,
    alertMessage VARCHAR(255),
    PRIMARY KEY (alertID)
);

CREATE TABLE Activity (
    ActivityID INT AUTO_INCREMENT,
    userID INT,
    actID INT,
    protectionID INT,
    datePerformed TIMESTAMP,
    notes VARCHAR(255),

    PRIMARY KEY (ActivityID),
    INDEX (userID),
    INDEX (actID),
    INDEX (protectionID),

    FOREIGN KEY (userID)
        REFERENCES profile(userID),

    FOREIGN KEY (actID)
        REFERENCES sexualacts(actID),

    FOREIGN KEY (protectionID)
        REFERENCES protection(protectionID)
);

CREATE TABLE Calendar (
    eventID INT AUTO_INCREMENT,
    userID INT,
    eventName VARCHAR(255),
    startDate DATE,
    finishDate DATE,
    
    PRIMARY KEY (eventID),
    INDEX (userID),
    
    FOREIGN KEY (userID)
        REFERENCES profile(userID)
);
