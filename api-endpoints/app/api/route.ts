import { NextRequest, NextResponse } from "next/server";
type dataType = {
  id: string;
  text: string;
};
let DATA: dataType[] = [
  {
    id: "1",
    text: "haii all",
  },
  {
    id: "2",
    text: "hello you !",
  },
];
export async function GET(request: Request) {
  return NextResponse.json({
    success: true,
    data: DATA,
  });
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json(
        {
          success: false,
          msg: "provide text",
        },
        {
          status: 400,
        }
      );
    }

    const newData: dataType = {
      id: (DATA.length + 1).toString(),
      text,
    };
    DATA = [...DATA, newData];
    return NextResponse.json({
      success: true,
      msg: "data added",
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    let flag = true;
    DATA = DATA.filter((item, idx) => {
      if (item.id === id) {
        flag = false;
      }
      return item.id !== id;
    });
    if (flag) {
      return NextResponse.json({
        success: false,
        msg: "no item found",
      });
    }
    return NextResponse.json({
      success: true,
      msg: "data item deleted",
    });
  } catch (error) {}
}

export async function PATCH(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const { text } = await request.json();

    const dataItemIdx = DATA.findIndex((item, idx) => {
      return item.id === id;
    });
    console.log(id, dataItemIdx, DATA[dataItemIdx]);

    if (dataItemIdx === -1) {
      return NextResponse.json({
        success: false,
        msg: "no item found",
      });
    }

    const dataItem = {
      ...DATA[dataItemIdx],
      text,
    };

    DATA[dataItemIdx] = dataItem;

    return NextResponse.json({
      success: true,
      msg: "data item updated",
    });
  } catch (error) {}
}
