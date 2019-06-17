const BASE_URL =
  "https://3p8v5rmr93.execute-api.us-west-2.amazonaws.com/default/popular-replies";

export const fetchPopular = async (params = { from: 0, limit: 200 }) => {
  try {
    const response = await fetch(`${BASE_URL}?limit=${params.limit}`, {
      method: "GET",
      crossDomain: true,
      mode: "cors",
      cache: "no-cache"
    });
    if (!response.ok) {
      throw new Error("Error requesting popular whispers from the server");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchReplies = async (
  params = { wid: "", from: 0, limit: 200 }
) => {
  try {
    const response = await fetch(
      `${BASE_URL}?limit=${params.limit}&wid=${params.wid}`,
      {
        method: "GET",
        crossDomain: true,
        mode: "cors",
        cache: "no-cache"
      }
    );
    if (!response.ok) {
      throw new Error("Error requesting whisper's replies from the server");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const mapData = data => {
  return {
    data: {
      me2: data.me2,
      replies: data.replies,
      text: data.text,
      url: data.url,
      wid: data.wid
    },
    maxValue: 0,
    sons: []
  };
};
