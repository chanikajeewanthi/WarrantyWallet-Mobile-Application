import * as MediaLibrary from "expo-media-library";

/**
 * Save the image locally to the gallery and return the local URI.
 */
export const saveImageLocally = async (uri: string): Promise<string | null> => {
  try {
    if (!uri) throw new Error("Image URI is undefined");

    // Ask for Media Library permission if not granted
    const { status, granted } = await MediaLibrary.requestPermissionsAsync();
    if (!granted) {
      throw new Error("Permission denied to access media library");
    }

    // Create asset in gallery
    const asset = await MediaLibrary.createAssetAsync(uri);

    // Optional: create an album called "WarrantyPhotos"
    await MediaLibrary.createAlbumAsync("WarrantyPhotos", asset, false);

    console.log("Photo saved locally:", asset.uri);
    return asset.uri; // Return local URI
  } catch (error) {
    console.error("Error saving image locally:", error);
    return null;
  }
};
