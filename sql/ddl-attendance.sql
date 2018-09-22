CREATE TABLE `db_sams`.`attendance` (
  `att_id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `att_seq` INT NOT NULL,
  `subj_id` INT NOT NULL,
  `tid` INT NOT NULL,
  `inserted` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `insertedby` INT(11) NULL,
  `updatedby` INT(11) NULL,
  PRIMARY KEY (`att_id`, `date`));
