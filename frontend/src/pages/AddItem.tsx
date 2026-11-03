import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import StackLayout from "@/components/layout/StackLayout";
import Container from "@/components/layout/Container";
import ItemSection from "@/components/layout/ItemSection";
import AddedItemSectionFooter from "@/components/footer/AddedItemSectionFooter";
import Spinner from "@/components/Buget/Spinner";
import { useGetItemCollectionsQuery } from "@/redux/api/item-collection";

export default function AddItem() {
  const { data, isLoading } = useGetItemCollectionsQuery();

  return (
    <>
      <SafeAreaViewLayout>
        <StackLayout>
          <Container>
            <div className="md:px-10 flex flex-row justify-between items-center">
              <span className="font-bold text-2xl md:text-4xl text-white">
                Items
              </span>
            </div>
            {isLoading ? (
              <Spinner />
            ) : data?.data.length ? (
              <ItemSection data={data.data} />
            ) : (
              <div className="flex flex-col flex-1 justify-center items-center">
                <span className="text-white text-xl font-bold">
                  There is no items!!!
                </span>
              </div>
            )}
          </Container>
        </StackLayout>
      </SafeAreaViewLayout>
      <AddedItemSectionFooter />
    </>
  );
}
