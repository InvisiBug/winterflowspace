import { PageMetaData } from "src/lib/types";

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const generateTestCard = ({ title, subTitle, status, slug }: Args): any => {
  return {
    properties: {
      title: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      subTitle: {
        rich_text: [
          {
            text: { content: subTitle },
          },
        ],
      },
      status: {
        select: { name: status },
      },
      slug: {
        rich_text: [
          {
            text: { content: slug },
          },
        ],
      },
    },
  };
};

export const getPageMetaData = (rawCardInfo: any) => {
  const { properties } = rawCardInfo;

  const data: PageMetaData = { folder: "experiments" };

  for (const property in properties) {
    switch (property) {
      case "title":
        data.title = properties[property]?.title[0]?.text?.content;
        break;

      case "slug":
        data.slug = properties[property]?.rich_text[0]?.text.content;
        break;

      case "subTitle":
        data.subTitle = properties[property]?.rich_text[0]?.text.content;
        break;

      case "thumbnail":
        const uploadedImage = properties[property]?.files[0]?.file?.url;
        const linkedImage = properties[property]?.files[0]?.external?.url;

        data.thumbnail = uploadedImage ? uploadedImage : linkedImage;
        break;

      case "categories":
        const categories: string[] = [];

        properties[property].multi_select.forEach((element: any) => {
          categories.push(element.name);
        });

        if (categories.length > 0) {
          data.categories = categories;
        }
        break;

      case "status":
        data.status = properties[property].select?.name;
        break;

      case "description":
        data.description = properties[property]?.rich_text[0]?.text.content;
        break;

      case "coverImage":
        const uploadedImage2 = properties[property]?.files[0]?.file?.url;
        const linkedImage2 = properties[property]?.files[0]?.external?.url;

        data.coverImage = uploadedImage2 ? uploadedImage2 : linkedImage2;
        break;

      case "cardType":
        data.cardType = properties[property].select?.name;
        break;

      case "folder":
        data.folder = properties[property].select?.name;
        break;
    }
  }

  return data;
};

export const getImageBlockUrl = (data: any) => {
  const { image } = data;
  return image?.file?.url ? image?.file?.url : image?.external?.url;
};

interface Args {
  title: string;
  subTitle: string;
  status: string;
  slug: string;
}

