import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto'
import config from "../config";

const supabaseClient = createClient(
    config.supabaseUrl, config.supabaseKey

);
export default supabaseClient;





