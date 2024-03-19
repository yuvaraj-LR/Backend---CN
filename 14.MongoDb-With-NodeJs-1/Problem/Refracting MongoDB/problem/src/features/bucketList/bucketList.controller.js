import BucketListModel from "./bucketList.model.js";
import BucketListRepository from "./bucketList.repository.js";

export default class BucketListController {

  constructor() {
    this.bucketListRepository = new BucketListRepository();
  }

  add = async (req, res) => {
    const { title, description, dateAdded, targetDate, isCompleted } = req.body;
    // Refactor to use the repository method
    const itemToCreate = new BucketListModel(
      title,
      description,
      dateAdded,
      targetDate,
      isCompleted
    );

    const item = await this.bucketListRepository.addBucketListItem(
      itemToCreate
    );
    res.status(201).send(item);

    // let bucketItem = await this.bucketListRepository.addBucketListItem(item);

    // if(bucketItem) {
    //   res.status(200).send(bucketItem);
    // } else {
    //   res.status(200).send("Could not add into Bucket List.");
    // }

  };

  get = async (req, res) => {
    const { title } = req.query;
    // Refactor to use the repository method
    const item = await this.bucketListRepository.findOneBucketListItem(title);

    if (!item) {
      res.status(200).send("Item not found.");
    } else {
      res.status(200).send(item);
    }
  };
}
