interface IAliyunResourcesModels {
  data: IBlogItem[];
}

interface IBlogItem {
  category: string;
  title: string;
  location: string;
  date: string;
  urlImageBanner: string;
  contentBody: string;
  id: number;
}

export {IAliyunResourcesModels};
