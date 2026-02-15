import * as MediaLibrary from "expo-media-library";


export const saveImageLocally = async (uri: string): Promise<string | null> => {
  try {
    if (!uri) throw new Error("Image URI is undefined");


    const { status, granted } = await MediaLibrary.requestPermissionsAsync();
    if (!granted) {
      throw new Error("Permission denied to access media library");
    }


    const asset = await MediaLibrary.createAssetAsync(uri);


    await MediaLibrary.createAlbumAsync("WarrantyPhotos", asset, false);

    console.log("Photo saved locally:", asset.uri);
    return asset.uri;
  } catch (error) {
    console.error("Error saving image locally:", error);
    return null;
  }
};
