import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import StackLayout from "@/components/layout/StackLayout";
import Container from "@/components/layout/Container";
import ItemSection from "@/components/layout/ItemSection";
import AddedItemSectionFooter from "@/components/footer/AddedItemSectionFooter";
import Spinner from "@/components/Buget/Spinner";
import EmptyState from "@/components/Buget/EmptyState";
import Plate from "@/svg/Plate";
import { useGetItemCollectionsQuery } from "@/redux/api/item-collection";

export default function AddItem() {
  const { data, isLoading } = useGetItemCollectionsQuery();

  return (
    <>
      <SafeAreaViewLayout>
        <StackLayout>
          <Container>
            <div className="flex flex-row items-center justify-between">
              <span className="page-title text-white">Add Items</span>
            </div>
            {isLoading ? (
              <Spinner className="text-white" />
            ) : data?.data.length ? (
              <ItemSection data={data.data} />
            ) : (
              <EmptyState
                SVG={Plate}
                text="There are no items yet"
                subtitle="Create an item section and add items to start ordering."
                className="text-white/90"
              />
            )}
          </Container>
        </StackLayout>
      </SafeAreaViewLayout>
      <AddedItemSectionFooter />
    </>
  );
}
