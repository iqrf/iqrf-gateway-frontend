/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface IqmeshNetworkAutoNetworkRequest100 {
  /**
   * IQMESH Network management - AutoNetwork request.
   */
  mType: "iqmeshNetwork_AutoNetwork";
  data: {
    /**
     * Message identification for binding request with response.
     */
    msgId: string;
    req: {
      /**
       * Number of retries DPA transactions.
       */
      actionRetries?: number;
      /**
       * TX power to use in discovery process.
       */
      discoveryTxPower?: number;
      /**
       * Run discovery before start.
       */
      discoveryBeforeStart?: boolean;
      /**
       * Maximum number of waves.
       */
      waves: number;
      /**
       * Number of consecutive waves, i which no new nodes were added into network.
       */
      emptyWaves: number;
      [k: string]: any;
    };
    /**
     * Flag that includes additional parameters in the response.
     */
    returnVerbose?: boolean;
    [k: string]: any;
  };
  [k: string]: any;
}
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface IqmeshNetworkAutoNetworkResponse100 {
  /**
   * IQMESH Network management - AutoNetwork response.
   */
  mType: "iqmeshNetwork_AutoNetwork";
  data: {
    /**
     * Message identification for binding request with response.
     */
    msgId: string;
    /**
     * Returns following values, see its description.
     */
    rsp?: {
      /**
       * Wave number.
       */
      wave: number;
      /**
       * Number of nodes in the network.
       */
      nodesNr: number;
      /**
       * Number of nodes newly added into the network in this wave.
       */
      newNodesNr: number;
      /**
       * Returns nodes newly added into the network in this wave.
       */
      newNodes?: {
        /**
         * Module ID.
         */
        mid: string;
        /**
         * Assigned address.
         */
        address: number;
        [k: string]: any;
      }[];
      /**
       * Indication, if this is the last wave.
       */
      lastWave: boolean;
      [k: string]: any;
    };
    /**
     * Returns array of objects req-cnf-rsp, see its description.
     */
    raw?: {
      /**
       * Binary buffer with DPA request.
       */
      request: string;
      /**
       * YYYY-MM-DDTHH:MM:SS.SSS±HH:MM
       */
      requestTs: string;
      /**
       * Binary buffer with DPA confirmation.
       */
      confirmation: string;
      /**
       * YYYY-MM-DDTHH:MM:SS.SSS±HH:MM
       */
      confirmationTs: string;
      /**
       * Binary buffer with DPA response.
       */
      response: string;
      /**
       * YYYY-MM-DDTHH:MM:SS.SSS±HH:MM
       */
      responseTs: string;
      [k: string]: any;
    }[];
    /**
     * IQRF GW daemon instance identification.
     */
    insId?: string;
    /**
     * IQRF GW daemon API (general or mType) status.
     */
    status: number;
    /**
     * IQRF GW daemon API (general or mType) status in string form.
     */
    statusStr?: string;
    [k: string]: any;
  };
  [k: string]: any;
}
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface IqmeshNetworkBondNodeLocalRequest100 {
  /**
   * IQMESH Network management - Bond Node Local request.
   */
  mType: "iqmeshNetwork_BondNodeLocal";
  data: {
    /**
     * Message identification for binding request with response.
     */
    msgId: string;
    /**
     * Number of repetitions of DPA messages.
     */
    repeat?: number;
    req: {
      /**
       * Address to bond the device to.
       */
      deviceAddr: number;
      /**
       * See IQRF OS User's and Reference guides (remote bonding, function bondNewNode).
       */
      bondingMask?: number;
      /**
       *  Maximum number of FRCs used to test whether the [N] was successfully bonded. If the [N] does not respond, it is unbonded at the Coordinator�s side. If the value is 0, then no test is performed. If the [N] is connected to and bonded from DSM then this testing never succeeds.
       */
      bondingTestRetries?: number;
      [k: string]: any;
    };
    /**
     * Flag that includes additional parameters in the response.
     */
    returnVerbose?: boolean;
    [k: string]: any;
  };
  [k: string]: any;
}
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface IqmeshNetworkBondNodeLocalResponse100 {
  /**
   * IQMESH Network management - Bond Node Local response.
   */
  mType: "iqmeshNetwork_BondNodeLocal";
  data: {
    /**
     * Message identification for binding request with response.
     */
    msgId: string;
    /**
     * Returns following values, see its description.
     */
    rsp?: {
      /**
       * Assigned address to the node.
       */
      assignedAddr: number;
      /**
       * Number of nodes in the network.
       */
      nodesNr: number;
      /**
       * Hardware profile identification.
       */
      hwpId?: number;
      /**
       * Manufacture name.
       */
      manufacturer?: string;
      /**
       * Product name.
       */
      product?: string;
      /**
       * Supported standards by the device.
       */
      standards?: string[];
      /**
       * Returns Embedded peripheral OS - Read response.
       */
      osRead?: {
        /**
         * TR Module ID.
         */
        mid: string;
        /**
         * IQRF OS version.
         */
        osVersion: string;
        /**
         * See DPA guide.
         */
        trMcuType: {
          /**
           * TR&McuType value.
           */
          value?: number;
          /**
           * TR module type.
           */
          trType?: string;
          /**
           * TR module is FCC certified.
           */
          fccCertified?: boolean;
          /**
           * TR module MCU type.
           */
          mcuType?: string;
          [k: string]: any;
        };
        /**
         * IQRF OS build.
         */
        osBuild: string;
        /**
         * See lastRSSI at IQRF OS Reference Guide.
         */
        rssi: string;
        /**
         * Module supply voltage
         */
        supplyVoltage: string;
        /**
         * See DPA guide.
         */
        flags: {
          /**
           * Flags value.
           */
          value?: number;
          /**
           * Flags.0 - Insufficient OsBuild.
           */
          insufficientOsBuild?: boolean;
          /**
           * Flags.1 - Interface type.
           */
          interface?: string;
          /**
           * Flags.2 - Custom DPA handler was detected.
           */
          dpaHandlerDetected?: boolean;
          /**
           * Flags.3 - Custom DPA Handler is not detected but enabled.
           */
          dpaHandlerNotDetectedButEnabled?: boolean;
          /**
           * Flags.4 - No interface supported.
           */
          noInterfaceSupported?: boolean;
          [k: string]: any;
        };
        /**
         * See DPA guide.
         */
        slotLimits: {
          /**
           * Slot limits value.
           */
          value?: number;
          /**
           * Shortest timeslot length in 10 ms units.
           */
          shortestTimeslot?: string;
          /**
           * Longets timeslot length in 10 ms units.
           */
          longestTimeslot?: string;
          [k: string]: any;
        };
        /**
         * Individual Bonding Key.
         */
        ibk?: number[];
        /**
         * DPA version.
         */
        dpaVer?: string;
        /**
         * Number of all non-embedded peripherals implemented by Custom DPA Handler.
         */
        perNr?: number;
        /**
         * Bits array (starting from LSb of the 1st byte) specifying which of 32 embedded peripherals are enabled in the HWP Configuration.
         */
        embPers?: number[];
        /**
         * Hardware profile identification.
         */
        hwpId?: number;
        /**
         * Hardware profile version.
         */
        hwpIdVer?: number;
        /**
         * Various flags.
         */
        enumFlags?: {
          value?: number;
          rfModeStd?: boolean;
          rfModeLp?: boolean;
          stdAndLpNetwork?: boolean;
          [k: string]: any;
        };
        /**
         * Bits array (starting from LSb of the 1st byte) specifying which of non-embedded peripherals are implemented.
         */
        userPers?: number[];
        [k: string]: any;
      };
      [k: string]: any;
    };
    /**
     * Returns array of objects req-cnf-rsp, see its description.
     */
    raw?: {
      /**
       * Binary buffer with DPA request.
       */
      request: string;
      /**
       * YYYY-MM-DDTHH:MM:SS.SSS±HH:MM
       */
      requestTs: string;
      /**
       * Binary buffer with DPA confirmation.
       */
      confirmation: string;
      /**
       * YYYY-MM-DDTHH:MM:SS.SSS±HH:MM
       */
      confirmationTs: string;
      /**
       * Binary buffer with DPA response.
       */
      response: string;
      /**
       * YYYY-MM-DDTHH:MM:SS.SSS±HH:MM
       */
      responseTs: string;
      [k: string]: any;
    }[];
    /**
     * IQRF GW daemon instance identification.
     */
    insId?: string;
    /**
     * IQRF GW daemon API (general or mType) status.
     */
    status: number;
    /**
     * IQRF GW daemon API (general or mType) status in string form.
     */
    statusStr?: string;
    [k: string]: any;
  };
  [k: string]: any;
}
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface IqmeshNetworkEnumerateDeviceRequest100 {
  /**
   * IQMESH Network management - Enumerate Device request.
   */
  mType: "iqmeshNetwork_EnumerateDevice";
  data: {
    /**
     * Message identification for binding request with response.
     */
    msgId: string;
    /**
     * Number of repetitions of DPA messages.
     */
    repeat?: number;
    req: {
      /**
       * Device address to enumerate.
       */
      deviceAddr: number;
      /**
       * If to get more peripherals information.
       */
      morePeripheralsInfo?: boolean;
      [k: string]: any;
    };
    /**
     * Flag that includes additional parameters in the response.
     */
    returnVerbose?: boolean;
    [k: string]: any;
  };
  [k: string]: any;
}
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface IqmeshNetworkEnumerateDeviceResponse100 {
  /**
   * IQMESH Network management - Enumerate Device response.
   */
  mType: "iqmeshNetwork_EnumerateDevice";
  data: {
    /**
     * Message identification for binding request with response.
     */
    msgId: string;
    /**
     * Returns following values, see its description.
     */
    rsp?: {
      /**
       * Device address to enumerate.
       */
      deviceAddr: number;
      /**
       * Manufacture name.
       */
      manufacturer?: string;
      /**
       * Product name.
       */
      product?: string;
      /**
       * Supported standards by the device.
       */
      standards?: string[];
      /**
       * First response.
       */
      discovery?: {
        /**
         * Device is discovered.
         */
        discovered: boolean;
        /**
         * Device VRN integer.
         */
        vrn: number;
        /**
         * Device zone.
         */
        zone: number;
        /**
         * Device parent.
         */
        parent: number;
        [k: string]: any;
      };
      /**
       * Returns Embedded peripheral OS - Read response.
       */
      osRead?: {
        /**
         * TR Module ID.
         */
        mid: string;
        /**
         * IQRF OS version.
         */
        osVersion: string;
        /**
         * See DPA guide.
         */
        trMcuType?: {
          /**
           * TR&McuType value.
           */
          value?: number;
          /**
           * TR module type.
           */
          trType?: string;
          /**
           * TR module is FCC certified.
           */
          fccCertified?: boolean;
          /**
           * TR module MCU type.
           */
          mcuType?: string;
          [k: string]: any;
        };
        /**
         * IQRF OS build.
         */
        osBuild: string;
        /**
         * See lastRSSI at IQRF OS Reference Guide.
         */
        rssi?: string;
        /**
         * Module supply voltage
         */
        supplyVoltage?: string;
        /**
         * See DPA guide.
         */
        flags?: {
          /**
           * Flags value.
           */
          value?: number;
          /**
           * Flags.0 - Insufficient OsBuild.
           */
          insufficientOsBuild?: boolean;
          /**
           * Flags.1 - Interface type.
           */
          interface?: string;
          /**
           * Flags.2 - Custom DPA handler was detected.
           */
          dpaHandlerDetected?: boolean;
          /**
           * Flags.3 - Custom DPA Handler is not detected but enabled.
           */
          dpaHandlerNotDetectedButEnabled?: boolean;
          /**
           * Flags.4 - No interface supported.
           */
          noInterfaceSupported?: boolean;
          [k: string]: any;
        };
        /**
         * See DPA guide.
         */
        slotLimits?: {
          /**
           * Slot limits value.
           */
          value?: number;
          /**
           * Shortest timeslot length in 10 ms units.
           */
          shortestTimeslot?: string;
          /**
           * Longets timeslot length in 10 ms units.
           */
          longestTimeslot?: string;
          [k: string]: any;
        };
        [k: string]: any;
      };
      /**
       * Reduced or full eperExploreEnum.
       */
      peripheralEnumeration?: {
        /**
         * DPA version.
         */
        dpaVer: string;
        /**
         * Number of all non-embedded peripherals implemented by Custom DPA Handler.
         */
        perNr?: number;
        /**
         * Bits array (starting from LSb of the 1st byte) specifying which of 32 embedded peripherals are enabled in the HWP Configuration.
         */
        embPers?: number[];
        /**
         * Hardware profile identification.
         */
        hwpId: number;
        /**
         * Hardware profile version.
         */
        hwpIdVer: number;
        /**
         * Various flags.
         */
        flags?: {
          value?: number;
          rfModeStd?: boolean;
          rfModeLp?: boolean;
          stdAndLpNetwork?: boolean;
          [k: string]: any;
        };
        /**
         * Bits array (starting from LSb of the 1st byte) specifying which of non-embedded peripherals are implemented.
         */
        userPers?: number[];
        [k: string]: any;
      };
      /**
       * Reduced or full eperOsReadCfg.
       */
      trConfiguration?: {
        /**
         * Embedded peripherals enabled on the node.
         */
        embPeripherals?: {
          /**
           * An array of 32 bits. Each bit enables/disables one of the embedded 32 predefined peripherals.
           */
          values?: number[];
          /**
           * If coordinator is enabled.
           */
          coordinator?: boolean;
          /**
           * If node is enabled.
           */
          node?: boolean;
          /**
           * If OS is enabled.
           */
          os?: boolean;
          /**
           * If EEPROM is enabled.
           */
          eeprom?: boolean;
          /**
           * If EEEPROM is enabled.
           */
          eeeprom?: boolean;
          /**
           * If RAM is enabled.
           */
          ram?: boolean;
          /**
           * If LEDR is enabled.
           */
          ledr?: boolean;
          /**
           * If LEDG is enabled.
           */
          ledg?: boolean;
          /**
           * If SPI is enabled.
           */
          spi?: boolean;
          /**
           * If IO is enabled.
           */
          io?: boolean;
          /**
           * If thermometer is enabled.
           */
          thermometer?: boolean;
          /**
           * If PWM is enabled.
           */
          pwm?: boolean;
          /**
           * If UART is enabled.
           */
          uart?: boolean;
          /**
           * If FRC is enabled.
           */
          frc?: boolean;
          [k: string]: any;
        };
        /**
         * Used RF band.
         */
        rfBand?: string;
        /**
         * Main RF channel A of the main network. Valid numbers depend on used RF band.
         */
        rfChannelA?: number;
        /**
         * Same as above but second B channel. Used at RFPGM only.
         */
        rfChannelB?: number;
        /**
         * Main RF channel A of the optional subordinate network in case the node also plays a role of the coordinator of such network. Valid numbers depend on used RF band. Available for DPA<400.
         */
        rfSubChannelA?: number;
        /**
         * Same as above but second B channel.
         */
        rfSubChannelB?: number;
        /**
         * RF output power. Valid numbers 0-7.
         */
        txPower?: number;
        /**
         * RF signal filter. Valid numbers 0-64.
         */
        rxFilter?: number;
        /**
         * Timeout for receiving RF packets at LP mode at N device.
         */
        lpRxTimeout?: number;
        /**
         * A nonzero value specifies an alternative DPA service mode channel.
         */
        rfAltDsmChannel?: number;
        /**
         * If sets, then activates RFPGM invoking by TR module reset.
         */
        rfPgmEnableAfterReset?: boolean;
        /**
         * If sets, then terminates RFPGM automatically ~1 minute after reset.
         */
        rfPgmTerminateAfter1Min?: boolean;
        /**
         * If sets, then terminates RFPGM by dedicated pin of the TR module.
         */
        rfPgmTerminateMcuPin?: boolean;
        /**
         * If sets, then enables single or dual channel function.
         */
        rfPgmDualChannel?: boolean;
        /**
         * RFPGM receiving mode setting. If set, then LP (low power) Rx mode is used during RFPGM. Otherwise STD (standard) Rx mode is used.
         */
        rfPgmLpMode?: boolean;
        /**
         * Read only. Indicates that the last RFPGM has successfully been completed.
         */
        rfPgmIncorrectUpload?: boolean;
        /**
         * If set, then a Custom DPA handler is called in case of an event.
         */
        customDpaHandler?: boolean;
        /**
         * If set, then DP2P is enabled at [N].
         */
        dpaPeerToPeer?: boolean;
        /**
         * If set, then Node device can be controlled by a SPI or UART interface. Valid only in DPA version < 4.00
         */
        nodeDpaInterface?: boolean;
        /**
         * Baud rate of the UART interface if one is used.
         */
        uartBaudrate?: number;
        /**
         * If set, then DPA Autoexec is run at a later stage of the module boot time.
         */
        dpaAutoexec?: boolean;
        /**
         * If set, then the Node device does not route packets on the background.
         */
        routingOff?: boolean;
        /**
         * If set, then DPA IO Setup is run at an early stage of the module boot time.
         */
        ioSetup?: boolean;
        /**
         * If set, then device receives also peer-to-peer (non-networking) packets and raises PeerToPeer event.
         */
        peerToPeer?: boolean;
        /**
         * If set, then unbonded Node using default IQRF buttons never sleeps during the button bonding. From DPA v3.03
         */
        neverSleep?: boolean;
        /**
         * If the bit is set, then the [C] controls the STD+LP network; otherwise, it controls the STD network. The bit can only be changed if the network is empty (no [Ns] are bonded) otherwise the network will stop working. From DPA v4.00
         */
        stdAndLpNetwork?: boolean;
        [k: string]: any;
      };
      /**
       * Returns the same information as Get peripheral information but for up to 14 peripherals of consecutive indexes starting with the specified PCMD.
       */
      morePeripheralsInfo?: {
        /**
         * Extended peripheral characteristic. See Extended Peripheral Characteristic constants.
         */
        perTe: number;
        /**
         * Peripheral type. If the peripheral is not supported or enabled, then PerTx = PERIPHERAL_TYPE_DUMMY. See Peripheral Types constants.
         */
        perT: number;
        /**
         * Optional peripheral specific information.
         */
        par1: number;
        /**
         * Optional peripheral specific information.
         */
        par2: number;
        [k: string]: any;
      }[];
      [k: string]: any;
    };
    /**
     * Returns array of objects req-cnf-rsp, see its description.
     */
    raw?: {
      /**
       * Binary buffer with DPA request.
       */
      request: string;
      /**
       * YYYY-MM-DDTHH:MM:SS.SSS±HH:MM
       */
      requestTs: string;
      /**
       * Binary buffer with DPA confirmation.
       */
      confirmation: string;
      /**
       * YYYY-MM-DDTHH:MM:SS.SSS±HH:MM
       */
      confirmationTs: string;
      /**
       * Binary buffer with DPA response.
       */
      response: string;
      /**
       * YYYY-MM-DDTHH:MM:SS.SSS±HH:MM
       */
      responseTs: string;
      [k: string]: any;
    }[];
    /**
     * IQRF GW daemon instance identification.
     */
    insId?: string;
    /**
     * IQRF GW daemon API (general or mType) status.
     */
    status: number;
    /**
     * IQRF GW daemon API (general or mType) status in string form.
     */
    statusStr?: string;
    [k: string]: any;
  };
  [k: string]: any;
}
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface IqrfEmbedCoordinatorDiscoveryRequest100 {
  /**
   * Embedded peripheral Coordinator - Discovery request.
   */
  mType: "iqrfEmbedCoordinator_Discovery";
  data: {
    /**
     * Message identification for binding request with response.
     */
    msgId: string;
    /**
     * Timeout to wait for IQRF DPA response.
     */
    timeout?: number;
    req: {
      /**
       * Network device address.
       */
      nAdr: number;
      /**
       * Hardware profile identification.
       */
      hwpId?: number;
      param: {
        /**
         * TX Power used for discovery.
         */
        txPower?: number;
        /**
         * Nonzero value specifies maxItems node address to be part of the discovery process.
         */
        maxAddr?: number;
        [k: string]: any;
      };
      [k: string]: any;
    };
    /**
     * Flag that includes additional parameters in the response.
     */
    returnVerbose?: boolean;
    [k: string]: any;
  };
  [k: string]: any;
}
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface IqrfEmbedCoordinatorDiscoveryResponse100 {
  /**
   * Embedded peripheral Coordinator - Discovery response.
   */
  mType: "iqrfEmbedCoordinator_Discovery";
  data: {
    /**
     * Message identification for binding request with response.
     */
    msgId: string;
    /**
     * Timeout to wait for IQRF DPA response.
     */
    timeout?: number;
    rsp: {
      /**
       * Network device address.
       */
      nAdr: number;
      /**
       * Hardware profile identification.
       */
      hwpId: number;
      /**
       * DPA error code.
       */
      rCode: number;
      /**
       * DPA value.
       */
      dpaVal: number;
      result?: {
        /**
         * Number of discovered nodes.
         */
        discNr?: number;
        [k: string]: any;
      };
      /**
       * Error description from JS drivers.
       */
      errorStr?: string;
      [k: string]: any;
    };
    /**
     * Returns array of objects req-cnf-rsp, see its description.
     */
    raw?: {
      /**
       * Binary buffer with DPA request.
       */
      request: string;
      /**
       * YYYY-MM-DDTHH:MM:SS.SSS±HH:MM
       */
      requestTs: string;
      /**
       * Binary buffer with DPA confirmation.
       */
      confirmation: string;
      /**
       * YYYY-MM-DDTHH:MM:SS.SSS±HH:MM
       */
      confirmationTs: string;
      /**
       * Binary buffer with DPA response.
       */
      response: string;
      /**
       * YYYY-MM-DDTHH:MM:SS.SSS±HH:MM
       */
      responseTs: string;
      [k: string]: any;
    }[];
    /**
     * IQRF GW daemon instance identification.
     */
    insId?: string;
    /**
     * IQRF GW daemon API (general or mType) status.
     */
    status: number;
    /**
     * IQRF GW daemon API (general or mType) status in string form.
     */
    statusStr?: string;
    [k: string]: any;
  };
  [k: string]: any;
}