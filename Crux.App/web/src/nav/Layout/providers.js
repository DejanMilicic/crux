import React from "react";
import PropTypes from "prop-types";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MenuStoreProvider } from "stores/menu";
import { PopStoreProvider } from "stores/pop";
import { ListStoreProvider } from "stores/list";
import { ModelStoreProvider } from "stores/model";
import { DisplayStoreProvider } from "stores/display";
import { DeleteStoreProvider } from "stores/delete";
import { RefStoreProvider } from "stores/ref";
import { OperateStoreProvider } from "stores/operate";
import { LoaderStoreProvider } from "stores/loader";
import { RetainStoreProvider } from "stores/retain";
import { NoteStoreProvider } from "stores/note";

export function Providers({ children }) {
  return (
    <MenuStoreProvider>
      <PopStoreProvider>
        <ListStoreProvider>
          <ModelStoreProvider>
            <DisplayStoreProvider>
              <DeleteStoreProvider>
                <RefStoreProvider>
                  <OperateStoreProvider>
                    <LoaderStoreProvider>
                      <RetainStoreProvider>
                        <NoteStoreProvider>
                          <MuiPickersUtilsProvider utils={MomentUtils}>{children}</MuiPickersUtilsProvider>
                        </NoteStoreProvider>
                      </RetainStoreProvider>
                    </LoaderStoreProvider>
                  </OperateStoreProvider>
                </RefStoreProvider>
              </DeleteStoreProvider>
            </DisplayStoreProvider>
          </ModelStoreProvider>
        </ListStoreProvider>
      </PopStoreProvider>
    </MenuStoreProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
